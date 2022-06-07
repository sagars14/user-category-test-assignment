const mongoose = require("mongoose");

const EmailCategorySchema = new mongoose.Schema({
  categoryId: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("EmailCategories", EmailCategorySchema);
