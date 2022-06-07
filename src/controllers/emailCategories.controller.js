const {
  resCodes: { ERROR, DELETED },
  errMessages: { EXCEPTION_MSG },
  resMessages: { CATEGORY_CREATED, CATEGORY_UPDATED },
} = require('../constants/index')
const {
  createEmailForCategory,
  deleteEmailCategory,
  findEmailCategoriesById,
  updateEmailCategory,
} = require('../services/emailCategories.services')

exports.findEmailCategory = async (req, res) => {
  try {
    const { data, statusCode } = await findEmailCategoriesById(
      req.query.categoryId
    )
    if (statusCode === ERROR) {
      return res.status(ERROR).send({ error: data })
    }
    return res.status(statusCode).send({ data })
  } catch (err) {
    return res.status(ERROR).send({
      error: err.message || EXCEPTION_MSG,
    })
  }
}

exports.createEmailForCategory = async (req, res) => {
  try {
    const { error, data, statusCode } = await createEmailForCategory(req.body)

    if (statusCode === ERROR) {
      return res.status(ERROR).send({ error })
    }
    return res.status(statusCode).send({ data, message: CATEGORY_CREATED })
  } catch (err) {
    return res.status(ERROR).send({
      error: err.message || EXCEPTION_MSG,
    })
  }
}

exports.deleteEmailForCategory = async (req, res) => {
  try {
    const { error, data, statusCode } = await deleteEmailCategory(
      req.query.categoryId
    )
    if (statusCode === ERROR) {
      return res.status(ERROR).send({ error })
    }

    return res.status(DELETED).send({ data })
  } catch (err) {
    return res.status(ERROR).send({
      error: err.message || EXCEPTION_MSG,
    })
  }
}

exports.updateEmailForCategory = async (req, res) => {
  try {
    const { error, data, statusCode } = await updateEmailCategory(req.body)
    if (statusCode === ERROR) {
      return res.status(ERROR).send({ error })
    }

    return res.status(statusCode).send({ data, message: CATEGORY_UPDATED })
  } catch (err) {
    return res.status(ERROR).send({
      message: err.message || EXCEPTION_MSG,
    })
  }
}
