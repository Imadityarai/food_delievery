import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/store_context.jsx';

const Navbar = ({ setShowLoginPop }) => {
  const { token, setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // remove by key name
    setToken("");                      // clear context
    navigate("/");                     // redirect to home
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</li>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          <div className="dot"></div>
        </div>

        {/* User section */}
        <div className="navbar-user">
          {!token ? (
            // Show Sign In button when not logged in
            <button className="navbar-signin" onClick={() => setShowLoginPop(true)}>
              Sign In
            </button>
          ) : (
            // Show profile + dropdown when logged in
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" className="navbar-icon" />
              <ul className="navbar-dropdown">
                <li>
                  <img src={assets.bag_icon} alt="Bag" className="navbar-icon" />
                  Orders
                </li>
                <li    onClick={logout}>
                  <img
                    src={assets.logout_icon}
                    alt="Logout"
                    className="navbar-icon"
                 
                  />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
