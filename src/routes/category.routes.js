const express = require('express')
const {
  SCHEMAS: { CATEGORY_SCHEMA, UPDATE_CATEGORY_SCHEMA },
} = require('../constants')

const router = express.Router()
const {
  viewCategories,
  addCategories,
  updateCategories,
  deleteCategories,
} = require('../controllers/category.controller')
const validator = require('../middleware/validator')

/**
 * @swagger
 * /category/get/categories:
 *  get:
 *    summary: Get All Categories
 *    description: This API will get all the different categories.
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/get/categories', viewCategories)

/**
 * @swagger
 * /category/add/categories:
 *  post:
 *    summary: Create Categories
 *    description: Using This API user can create categories.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category name.
 *                 example: premium
 *               categoryDetails:
 *                 type: string
 *                 description: The category description.
 *                 example: Something about the category
 *    responses:
 *      200:
 *        description: Category Created Successfully
 */
router.post('/add/categories', validator(CATEGORY_SCHEMA), addCategories)

/**
 * @swagger
 * /category/update/categories:
 *  post:
 *    summary: Update Categories
 *    description: This API will update the category based on the unique id.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: The category id of the category which is going to be updated.
 *                 example: "asdasdas87das6d87"
 *               category:
 *                 type: string
 *                 description: The cateogry name.
 *                 example: Free
 *               categoryDetails:
 *                 type: string
 *                 description: Description of the category.
 *                 example: Something related to category
 *    responses:
 *      200:
 *        description: Category updated successfully
 */
router.post(
  '/update/categories',
  validator(UPDATE_CATEGORY_SCHEMA),
  updateCategories
)

/**
 * @swagger
 * /category/delete/categories:
 *  delete:
 *    summary: Delete the category
 *    description: This API will delete provided category.
 *    parameters:
 *      - in: query
 *        name: categoryId
 *        required: true
 *        description: Id of the category to be deleted.
 *        example: 6290ae2ecadff67564dd845a
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Category Deleted Successfully
 */
router.delete('/delete/categories', deleteCategories)

module.exports = router
