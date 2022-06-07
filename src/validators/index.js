const {
  categorySchema,
  updateCategorySchema,
} = require("./category.validator");
const { userSchema } = require("./user.validator");
const {
  emailCategorySchema,
  updateEmailCategorySchema,
} = require("./emailCategories.validator");

module.exports = {
  categorySchema,
  updateCategorySchema,
  userSchema,
  emailCategorySchema,
  updateEmailCategorySchema,
};
