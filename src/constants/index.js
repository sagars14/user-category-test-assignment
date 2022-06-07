require('dotenv').config()

const resCodes = {
  SUCCESS: 200,
  ERROR: 500,
  CREATED: 201,
  ALREADY_EXISTS: 409,
  DELETED: 204,
  UNAUTHORIZED: 401,
  VALIDATION: 422,
}

const resMessages = {
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  CATEGORY_CREATED: 'Category created successfully',
  CATEGORY_UPDATED: 'Category updated successfully',
  CATEGORY_DELETED: 'Category deleted successfully',
  LOGGED_IN_SUCCESS: 'Logged In Successfully',
}

const errMessages = {
  EXCEPTION_MSG: 'Something went wrong!',
  USER_ALREADY_EXISTS: 'User already exists',
  EMAIL_ALREADY_EXISTS: 'Email already exists!',
  USER_NOT_EXIST: 'User does not Exists',
  USER_UNAUTHORIZED: 'Unauthorized User!',
  WRONG_CREDENTIALS: 'Wrong Credentials, Please try again',
  NO_RECORD_FOUND: 'No Record found',
  INCORRECT_EMAIL_PASS: 'Incorrect email or password.',
}

const SCHEMAS = {
  USER_SCHEMA: 'userSchema',
  CATEGORY_SCHEMA: 'categorySchema',
  UPDATE_CATEGORY_SCHEMA: 'updateCategorySchema',
  EMAIL_CATEGORY_SCHEMA: 'emailCategorySchema',
  UPDATE_EMAIL_CATEGORY_SCHEMA: 'updateEmailCategorySchema',
}

const { SECRET_KEY } = process.env
const { PORT } = process.env

module.exports = {
  resCodes,
  resMessages,
  errMessages,
  SECRET_KEY,
  PORT,
  SCHEMAS,
}
