const _ = require('lodash')
const {
  resCodes: { SUCCESS, ERROR, DELETED, CREATED },
  errMessages: { NO_RECORD_FOUND, EXCEPTION_MSG },
} = require('../constants')
const Categories = require('../models/categories.model')
const EmailCategory = require('../models/emailCategories.model')

/**
 * @param  {}
 * @returns statusCode<success | error>, data<actual data>, error<error message>
 */
exports.findAllCategories = async () => {
  try {
    const data = await Categories.find()
    return { statusCode: SUCCESS, data }
  } catch (error) {
    return { statusCode: ERROR, error: error.message || EXCEPTION_MSG }
  }
}

/**
 * @param  {categoriesData}
 * @returns statusCode<created | error>, data<actual data>, error<error message>
 */
exports.createCategories = async (categoriesData) => {
  try {
    const data = await Categories.create(categoriesData)
    return { statusCode: CREATED, data }
  } catch (error) {
    return { statusCode: ERROR, error: error.message || EXCEPTION_MSG }
  }
}

/**
 * @param  {categoriesData}
 * @returns statusCode<success | error>, data<actual data || message>, error<error message>
 */
exports.updateCategories = async (categoriesData) => {
  try {
    const { category, categoryDetails, categoryId } = categoriesData

    const categoryData = await Categories.findById(categoryId)

    if (!_.isEmpty(categoryData)) {
      categoryData.category = category
      categoryData.categoryDetails = categoryDetails

      await categoryData.save()
      return { statusCode: SUCCESS, data: categoryData }
    }
    return { statusCode: SUCCESS, data: NO_RECORD_FOUND }
  } catch (error) {
    return { statusCode: ERROR, error: error.message || EXCEPTION_MSG }
  }
}

/**
 * @param  {categoryId}
 * @returns statusCode<deleted | success | error>, data<actual data || message>, error<error message>
 */
exports.deleteCategories = async (categoryId) => {
  try {
    const categoryFound = await Categories.findById(categoryId)

    if (!_.isEmpty(categoryFound)) {
      await EmailCategory.deleteMany({ categoryId })
      const data = await Categories.deleteOne({ _id: categoryId })

      return { statusCode: DELETED, data }
    }
    return { statusCode: SUCCESS, data: categoryFound }
  } catch (error) {
    return { statusCode: ERROR, error: error.message || EXCEPTION_MSG }
  }
}
