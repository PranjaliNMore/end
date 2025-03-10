import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import "../styles/Home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/recipes") // ✅ No need to manually add API_BASE_URL
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
