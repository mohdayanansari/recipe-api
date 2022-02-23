const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
    minlength: 3,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  itemsNeededList: {
    type: Array,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
    minlength: 5,
  },
  img: {
    type: String,
    default: "placeholder.jpg",
    required: false,
  },
});

// Creating new Collection of Cars using model

const RecipeModel = new mongoose.model("Recipe", recipeSchema);

module.exports = RecipeModel;
