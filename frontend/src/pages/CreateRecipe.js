import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://end-4ukx.onrender.com"; // Ensure API base URL

// ✅ Configure Axios globally within this file
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ Attach token to request headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false); // ✅ Loading state for button

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      alert("You must be logged in to create a recipe!");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Show loading state
    const ingredientsArray = ingredients.split(",").map((item) => item.trim());

    const recipeData = {
      title,
      description,
      ingredients: ingredientsArray,
      instructions,
      time,
      image,
      category,
      user: user?._id,
    };

    try {
      await axios.post(`${API_BASE_URL}/recipes`, recipeData);
      alert("Recipe created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating recipe:", error.response?.data || error.message);
      alert("Error creating recipe");
    } finally {
      setLoading(false); // ✅ Hide loading state
    }
  };

  const goNextStep = (currentStep) => {
    const fields = [title, category, description, ingredients, instructions, time, image];
    if (!fields[currentStep]) {
      alert("Please fill out this step before proceeding.");
      return;
    }
    setStep(currentStep + 1);
  };

  return (
    <div className="create-recipe-container d-flex justify-content-center align-items-start">
      <div className="create-recipe-box shadow">
        <h2 className="mb-4 text-center form-heading">Create a New Recipe</h2>

        <form onSubmit={handleSubmit}>
          {step >= 0 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Recipe Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter recipe title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <button type="button" className="btn btn-secondary mt-2" onClick={() => goNextStep(0)}>
                Next
              </button>
            </div>
          )}

          {step >= 1 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Select Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Choose Category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Desserts">Desserts</option>
              </select>
              <button type="button" className="btn btn-secondary mt-2" onClick={() => goNextStep(1)}>
                Next
              </button>
            </div>
          )}

          {step >= 2 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Short Description</label>
              <textarea
                className="form-control"
                placeholder="Briefly describe your recipe"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <button type="button" className="btn btn-secondary mt-2" onClick={() => goNextStep(2)}>
                Next
              </button>
            </div>
          )}

          {step >= 3 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Ingredients (comma separated)</label>
              <textarea
                className="form-control"
                placeholder="e.g. flour, sugar, eggs"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              ></textarea>
              <button type="button" className="btn btn-secondary mt-2" onClick={() => goNextStep(3)}>
                Next
              </button>
            </div>
          )}

          {step >= 4 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Instructions</label>
              <textarea
                className="form-control"
                placeholder="Describe the preparation steps"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              ></textarea>
              <button type="button" className="btn btn-secondary mt-2" onClick={() => goNextStep(4)}>
                Next
              </button>
            </div>
          )}

          {step >= 5 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Cooking Time (minutes)</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 30"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
              <button type="button" className="btn btn-secondary mt-2" onClick={() => goNextStep(5)}>
                Next
              </button>
            </div>
          )}

          {step >= 6 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Image URL (optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Paste an image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <button type="button" className="btn btn-secondary mt-2" onClick={() => goNextStep(6)}>
                Next
              </button>
            </div>
          )}

          {step >= 7 && (
            <button type="submit" className="btn btn-primary w-100 mt-3 create-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Recipe"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;

