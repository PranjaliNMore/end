import { useEffect, useState } from "react";
import axios from "axios";

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("/recipes/my-recipes"); // ✅ No need to manually attach token
        setMyRecipes(res.data);
      } catch (error) {
        console.error("Error fetching recipes:", error.response?.data || error.message);
        setError("Failed to load recipes. Please try again.");
      }
    };

    if (user) fetchRecipes();
  }, [user]);

  if (!user) return <p>Please log in to view your recipes.</p>;

  return (
    <div>
      <h1>My Recipes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {myRecipes.length === 0 ? (
        <p>You haven't created any recipes yet.</p>
      ) : (
        myRecipes.map((recipe) => (
          <div key={recipe._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h2>{recipe.title}</h2>
            <p>{recipe.instructions}</p>
            {recipe.image && <img src={recipe.image} alt={recipe.title} style={{ maxWidth: "200px" }} />}
          </div>
        ))
      )}
    </div>
  );
}

export default MyRecipes;


