import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Ensure we handle cases where `user` is null
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-dark">
      <div className="container-fluid">
        {/* Website Logo and Name */}
        <Link className="navbar-brand logo" to="/">
        👨‍🍳 <span className="unique-logo">Recipedia</span>
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/create-recipe">
                Create Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/my-recipe">
                My Recipes
              </Link>
            </li>
          </ul>

          {/* User Authentication Links */}
          <div className="d-flex align-items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-danger ms-2"
              >
                Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-success me-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-info" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

