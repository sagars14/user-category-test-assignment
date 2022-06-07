const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category: {
    required: true,
    type: String,
  },
  categoryDetails: {
    required: true,
    type: String,
  }
});

module.exports = mongoose.model("Categories", CategorySchema);
