const express = require('express')
const {
  SCHEMAS: { EMAIL_CATEGORY_SCHEMA, UPDATE_EMAIL_CATEGORY_SCHEMA },
} = require('../constants')
const {
  createEmailForCategory,
  findEmailCategory,
  updateEmailForCategory,
  deleteEmailForCategory,
} = require('../controllers/emailCategories.controller')

const router = express.Router()

const validator = require('../middleware/validator')

/**
 * @swagger
 * /email/get/categories:
 *  get:
 *    summary: Fetch the list of Categories assiciated with their emails
 *    description: This API will get all categories with their emails.
 *    parameters:
 *      - in: query
 *        name: categoryId
 *        required: true
 *        description: Id of the category to be retrieved.
 *        example: 629f4dc235181da37ed46f19
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Data which contains category and email
 */
router.get('/get/categories', findEmailCategory)

/**
 * @swagger
 * /email/add/categories:
 *  post:
 *    summary: Add a new entry with email and category
 *    description: This API will add a new entry in email category schema with email and category.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: The category Id.
 *                 example: 629f4def35181da37ed46f1b
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: xyz@gmail.com
 *    responses:
 *      200:
 *        description: Success with inserted data object
 */
router.post(
  '/add/categories',
  validator(EMAIL_CATEGORY_SCHEMA),
  createEmailForCategory
)

/**
 * @swagger
 * /email/update/categories:
 *  post:
 *    summary: Update Categories
 *    description: This API will update the email id againts the categoryId.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: The category id.
 *                 example: 629f4def35181da37ed46f1b
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: xyz@gmail.com
 *    responses:
 *      200:
 *        description: Email updated with respective categoryId
 */
router.post(
  '/update/categories',
  validator(UPDATE_EMAIL_CATEGORY_SCHEMA),
  updateEmailForCategory
)

/**
 * @swagger
 * /email/delete/categories:
 *  delete:
 *    summary: Delete the category with respective to their email ids
 *    description: This API will delete the passed category.
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
router.delete('/delete/categories', deleteEmailForCategory)

module.exports = router
