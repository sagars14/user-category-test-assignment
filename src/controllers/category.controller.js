const {
  resCodes: { ERROR, SUCCESS, CREATED, DELETED },
  errMessages: { NO_RECORD_FOUND, EXCEPTION_MSG },
  resMessages: { CATEGORY_CREATED, CATEGORY_UPDATED, CATEGORY_DELETED },
} = require('../constants/index')
const {
  findAllCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} = require('../services/category.services')

exports.viewCategories = async (req, res) => {
  try {
    const { statusCode, data } = await findAllCategories()
    if (statusCode === ERROR) {
      return res.status(ERROR).send({ error: data })
    }
    return res.status(SUCCESS).send({ data })
  } catch (error) {
    return res.status(ERROR).send({ error: error.message || EXCEPTION_MSG })
  }
}

exports.addCategories = (req, res) => {
  try {
    const { statusCode, data } = createCategories(req.body)
    if (statusCode === ERROR) {
      return res.status(ERROR).send({ error: data })
    }
    return res.status(CREATED).send({ data, message: CATEGORY_CREATED })
  } catch (error) {
    return res.status(ERROR).send({ error: error.message || EXCEPTION_MSG })
  }
}

exports.updateCategories = (req, res) => {
  try {
    const { statusCode, data } = updateCategories(req.body)
    if (statusCode === ERROR) {
      return res.status(ERROR).send({ error: data })
    }
    return res.status(SUCCESS).send({ data, message: CATEGORY_UPDATED })
  } catch (error) {
    return res.status(ERROR).send({ error: error.message || EXCEPTION_MSG })
  }
}

exports.deleteCategories = async (req, res) => {
  try {
    const { statusCode, data, error } = await deleteCategories(
      req.query.categoryId
    )

    if (statusCode === ERROR) {
      return res.status(ERROR).send({ error })
    }

    if (statusCode === DELETED) {
      return res.status(DELETED).send({ message: CATEGORY_DELETED })
    }
    return res.status(SUCCESS).send({ data, message: NO_RECORD_FOUND })
  } catch (error) {
    return res.status(ERROR).send({ error: error.message || EXCEPTION_MSG })
  }
}
