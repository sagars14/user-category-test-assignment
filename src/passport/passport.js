/* eslint-disable no-underscore-dangle */
const _ = require('lodash')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const {
  errMessages: { INCORRECT_EMAIL_PASS, EXCEPTION_MSG },
  SECRET_KEY,
  resMessages: { LOGGED_IN_SUCCESS },
} = require('../constants')
const { findUser, findUserById } = require('../services/user.services')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, cb) => {
      try {
        const user = await findUser({ email, password })
        if (_.isEmpty(user)) {
          return cb(null, false, {
            message: INCORRECT_EMAIL_PASS,
          })
        }
        return cb(null, user, { message: LOGGED_IN_SUCCESS })
      } catch (error) {
        return cb(null, false, {
          message: error.message || EXCEPTION_MSG,
        })
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    async (jwtPayload, cb) => {
      try {
        const user = await findUserById(jwtPayload._id)
        return cb(null, user)
      } catch (error) {
        return cb(error)
      }
    }
  )
)
