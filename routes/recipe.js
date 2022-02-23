// recipe routes
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Defining storage for the images
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./uploads/images");
  },
  // add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

// upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

require("../db/conn");
const RecipeModel = require("../models/recipeModel");

// !-----------------------------
router.get("/", (req, res) => {
  res.send("Hey There!!");
});

// todo POST route::
router.post("/add-recipe", upload.single("image"), async (req, res) => {
  console.log(req.file);
  const { recipeName, ingredients, itemsNeededList, instructions } = req.body;
  const img = req.file.filename;
  if (!recipeName || !ingredients || !itemsNeededList || !instructions) {
    return res.status(422).json({ error: "Please fill the required details" });
  }
  try {
    const dataFilled = await RecipeModel.findOne({ recipeName: recipeName });

    if (dataFilled) {
      return res.status(422).json({ error: "Recipe already Exist!!" });
    }
    const newRecipe = new RecipeModel({
      recipeName,
      ingredients,
      itemsNeededList,
      instructions,
      img,
    });
    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully!!" });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//todo: Get All data::
router.get("/show-all-recipe", async (req, res) => {
  try {
    const showData = await RecipeModel.find();
    res.status(200).send(showData);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// todo:: Get a individual recipe::
router.get("/show-single-recipe/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const singleRecipe = await RecipeModel.findById({ _id: _id });

    if (!singleRecipe) {
      return res.status(404).send({ message: "no data found!!" });
    } else {
      res.status(200).send(singleRecipe);
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// todo:: Update a Recipe::
router.patch("/update-recipe/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updataRecipe = await RecipeModel.findByIdAndUpdate(_id, req.body, {
      new: true, //* Shows instant updated Data
    });
    res.status(201).send(updataRecipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

// todo::: DELETE RECIPE
router.delete("/delete-recipe/:id", async (req, res) => {
  try {
    const delteRecipe = await RecipeModel.findByIdAndDelete(req.params.id);

    if (!delteRecipe) {
      return res.status(500).send({ message: "error in deleting the recipe" });
    } else {
      return res.send(delteRecipe);
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});
module.exports = router;
