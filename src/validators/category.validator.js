const Joi = require("joi");

const categorySchema = Joi.object({
  category: Joi.string().lowercase().required(),
  categoryDetails: Joi.string().max(50).required(),
});

const updateCategorySchema = Joi.object({
  categoryId: Joi.string().required(),
  category: Joi.string().lowercase().required(),
  categoryDetails: Joi.string().max(50).required(),
});

module.exports = { categorySchema, updateCategorySchema };
