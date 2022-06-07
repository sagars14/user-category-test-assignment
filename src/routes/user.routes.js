const express = require("express");
const {
  SCHEMAS: { USER_SCHEMA },
} = require("../constants");

const router = express.Router();
const { createUser, loginUser } = require("../controllers/user.controller");

const validator = require("../middleware/validator");

/**
 * @swagger
 * /user/auth:
 *  post:
 *    summary: User Login
 *    description: This API will validate the user based on provided credentials.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: xyz@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Something super secret
 *    responses:
 *      200:
 *        description: Logged in
 */
router.post("/auth", loginUser);

/**
 * @swagger
 * /user/signup:
 *  post:
 *    summary: User Signup
 *    description: This API will create the new User based on provided credentials.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: xyz
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: xyz@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Something super secret
 *    responses:
 *      200:
 *        description: New User Created
 */
router.post("/signup", validator(USER_SCHEMA), createUser);

module.exports = router;
