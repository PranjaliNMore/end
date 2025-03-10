const express = require("express");
const { getRecipes, getMyRecipes,CreateRecipe} = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getRecipes); // ✅ Get all recipes
router.get("/my", authMiddleware, getMyRecipes); // ✅ Get logged-in user's recipes
router.post("/", authMiddleware, CreateRecipe); // ✅ Add this route to create a recipe
module.exports = router;



