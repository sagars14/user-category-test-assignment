/* eslint-disable consistent-return */
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {
  resCodes: { ALREADY_EXISTS, ERROR, CREATED },
  errMessages: { USER_ALREADY_EXISTS, EXCEPTION_MSG },
  resMessages: { USER_CREATED },
  SECRET_KEY,
} = require('../constants/index')
const { createUser } = require('../services/user.services')

exports.createUser = async (req, res) => {
  try {
    const { statusCode, data, error } = await createUser(req.body)

    if (statusCode === ERROR) {
      return res.status(statusCode).send({ error })
    }
    if (statusCode === ALREADY_EXISTS) {
      return res
        .status(ALREADY_EXISTS)
        .send({ data, message: USER_ALREADY_EXISTS })
    }
    return res.status(CREATED).send({ data, message: USER_CREATED })
  } catch (error) {
    return res.status(ERROR).send({ error: error.message || EXCEPTION_MSG })
  }
}

exports.loginUser = (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info.message || info,
          user,
        })
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error)
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user.toJSON(), SECRET_KEY)
        return res.json({ user, token })
      })
    })(req, res, next)
  } catch (error) {
    return res.status(ERROR).send({ error: error.message || EXCEPTION_MSG })
  }
}
