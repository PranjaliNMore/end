const Recipe = require("../models/Recipe");

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "username"); // Populate username
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Error fetching recipes" });
  }
};

// Get logged-in user's recipes
const getMyRecipes = async (req, res) => {
  try {
    const myRecipes = await Recipe.find({ user: req.user.id });
    res.json(myRecipes);
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.status(500).json({ error: "Error fetching user recipes" });
  }
};

module.exports = { getRecipes, getMyRecipes };
