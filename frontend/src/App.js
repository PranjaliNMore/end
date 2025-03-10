import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios"; // ✅ Import axios
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateRecipe from "./pages/CreateRecipe";
import MyRecipe from "./pages/MyRecipe";
import CategoryRecipes from "./pages/CategoryRecipes"; // ✅ New Page
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import API_BASE_URL from "./config"; // ✅ Import API URL

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);

    // ✅ Set token globally in Axios
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/my-recipe" element={<MyRecipe />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/category/:category" element={<CategoryRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
