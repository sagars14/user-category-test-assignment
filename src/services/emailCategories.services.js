const _ = require('lodash')
const EmailCategory = require('../models/emailCategories.model')
const Category = require('../models/categories.model')
const {
  errMessages: { EMAIL_ALREADY_EXISTS, NO_RECORD_FOUND, EXCEPTION_MSG },
  resCodes: { SUCCESS, ERROR, CREATED, ALREADY_EXISTS, DELETED },
} = require('../constants')

/**
 * @param  {categoryId}
 * @returns statusCode<success | error>, data<response | message>, error<error message>
 */
exports.findEmailCategoriesById = async (categoryId) => {
  try {
    const categoryData = await Category.findById(categoryId)
    const emailCategoryData = await EmailCategory.find({ categoryId })

    if (!_.isEmpty(categoryData)) {
      const emailsList = !_.isEmpty(emailCategoryData)
        ? emailCategoryData.map((el) => _.get(el, 'email'))
        : []

      const response = {
        categoryName: _.get(categoryData, 'categoryName'),
        categoryId,
        emails: emailsList,
      }
      return { statusCode: SUCCESS, data: response }
    }
    return { statusCode: ERROR, data: NO_RECORD_FOUND }
  } catch (err) {
    return { statusCode: ERROR, error: err.message || EXCEPTION_MSG }
  }
}

/**
 * @param  {emailCategoryData}
 * @returns statusCode<created | error | already_exist>, data<actual data | message>, error<error message>
 */
exports.createEmailForCategory = async (emailCategoryData) => {
  try {
    const emailCategory = await EmailCategory.findOne(emailCategoryData).exec()

    if (!_.isEmpty(emailCategory)) {
      return { statusCode: ALREADY_EXISTS, data: EMAIL_ALREADY_EXISTS }
    }

    return {
      statusCode: CREATED,
      data: await EmailCategory.create(emailCategoryData),
    }
  } catch (err) {
    return { statusCode: ERROR, error: err.message || EXCEPTION_MSG }
  }
}

/**
 * @param  {categoryId}
 * @returns statusCode<delted | error>, data<actual data>, error<error message>
 */
exports.deleteEmailCategory = async (categoryId) => {
  try {
    return {
      statusCode: DELETED,
      data: await EmailCategory.deleteOne({ _id: categoryId }),
    }
  } catch (err) {
    return { statusCode: ERROR, error: err.message || EXCEPTION_MSG }
  }
}

/**
 * @param  {} updateCategoryData
 * @param  {updateCategoryData}
 * @returns statusCode<success | error>, data<errorMessage | actual data>
 */
exports.updateEmailCategory = async (updateCategoryData) => {
  try {
    const { categoryId, email } = updateCategoryData

    const emailCategory = await EmailCategory.findById(categoryId)

    if (!_.isEmpty(emailCategory)) {
      emailCategory.email = email

      const userEmail = await EmailCategory.findOne({ email })

      if (_.isEmpty(userEmail)) {
        await emailCategory.save()
        return { statusCode: SUCCESS, data: emailCategory }
      }
      return { statusCode: SUCCESS, data: EMAIL_ALREADY_EXISTS }
    }
    return { statusCode: SUCCESS, data: NO_RECORD_FOUND }
  } catch (err) {
    return { statusCode: ERROR, error: err.message || EXCEPTION_MSG }
  }
}
