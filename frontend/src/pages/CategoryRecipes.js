import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

function CategoryPage() {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/recipes/category/${category}`);
        setRecipes(res.data);
      } catch (err) {
        console.error("Error fetching category recipes:", err);
        setError("Failed to fetch recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryRecipes();
  }, [category]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">{category} Recipes</h2>

      {/* Show loading state */}
      {loading && <p className="text-center">Loading recipes...</p>}

      {/* Show error message if API call fails */}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Show recipes if available, otherwise show message */}
      {!loading && !error && (
        <div className="row">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe._id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={recipe.image || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={recipe.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">{recipe.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No recipes found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;

