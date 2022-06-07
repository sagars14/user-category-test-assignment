const Joi = require("joi");

const emailCategorySchema = Joi.object({
  categoryId: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
});

const updateEmailCategorySchema = Joi.object({
  categoryId: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = { emailCategorySchema, updateEmailCategorySchema };
