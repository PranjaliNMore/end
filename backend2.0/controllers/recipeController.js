const Recipe = require("../models/Recipe");

// ✅ Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "username"); // Populate username
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Error fetching recipes" });
  }
};

// ✅ Get logged-in user's recipes
const getMyRecipes = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const myRecipes = await Recipe.find({ user: req.user.id });
    res.json(myRecipes);
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.status(500).json({ error: "Error fetching user recipes" });
  }
};

// ✅ Create a new recipe (POST /recipes)
const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, time, image, category } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    if (!title || !description || !ingredients || !instructions || !time || !category) {
      return res.status(400).json({ error: "All fields except image are required" });
    }

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      time,
      image,
      category,
      user: req.user.id,
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Server error while creating recipe" });
  }
};

module.exports = { getRecipes, getMyRecipes, createRecipe };
