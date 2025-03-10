/**
 * The `Home` component in React fetches recipes from an API, displays a search input and category
 * buttons, showcases a hero section with a call-to-action button, and features a carousel of recipe
 * titles.
 * @returns The `Home` component is being returned in the code snippet provided. It is a functional
 * component in a React application that displays a home page for a recipe-sharing platform. The
 * component fetches recipes from an API, displays a search input field, category buttons, a hero
 * section with a welcome message, and a carousel of featured recipes. The component also includes
 * navigation links to specific recipe categories and a link
 */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import "../styles/Home.css";

const API_BASE_URL = "https://end-4ukx.onrender.com";
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/recipes`)  // ✅ No need to manually add API_BASE_URL
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  return (
    <div className="home-container">
      <section className="search-category-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="category-container">
          {["All", "Breakfast", "Lunch", "Dinner", "Desserts"].map((cat) => (
            <button
              key={cat}
              className="category-button"
              onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <header className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to <span className="highlight">Recipedia!</span></h1>
          <p>Discover & share mouthwatering recipes! 🍽️</p>
          <Link to="/create-recipe" className="cta-button">
            Create Your Own Recipe
          </Link>
        </div>
      </header>

      <div className="carousel-container">
        <Slider {...settings} className="carousel">
          {recipes.slice(0, 5).map((recipe) => (
            <div key={recipe._id} className="carousel-slide">
              <Link to={`/recipes/${recipe._id}`} className="carousel-caption">
                <h2 className="carousel-title">{recipe.title}</h2>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
