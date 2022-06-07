const _ = require("lodash");
const User = require("../models/user.model");
const {
  resCodes: { ALREADY_EXISTS, CREATED, ERROR },
  errMessages: { USER_ALREADY_EXISTS, EXCEPTION_MSG },
} = require("../constants/index");

/**
 * @param  {} userData
 * @returns statusCode<SUCCESS | CREATED, ALREADY_EXIST>, data<error message | data>, error<error message>
 */
exports.createUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    const userRecord = await User.findOne({ email }).exec();
    if (!_.isEmpty(userRecord)) {
      return {
        statusCode: ALREADY_EXISTS,
        data: USER_ALREADY_EXISTS,
      };
    }

    return {
      statusCode: CREATED,
      data: await User.create({ name, email, password }),
    };
  } catch (err) {
    return { statusCode: ERROR, error: err.message || EXCEPTION_MSG };
  }
};

/**
 * @param  {} userData
 * @returns err <error message>, data <errorMessage | actual data>
 */
exports.findUser = async (userData) => {
  try {
    return await User.findOne(userData).exec();
  } catch (error) {
    return { error: error.message || EXCEPTION_MSG }
  }
};

/**
 * @param  {} userId
 * @returns err <error message>, data <errorMessage | actual data>
 */
exports.findUserById = async (userId) => {
  try {
    return await User.findById(userId).exec();
  } catch (error) {
    return { error: error.message || EXCEPTION_MSG }
  }
};
