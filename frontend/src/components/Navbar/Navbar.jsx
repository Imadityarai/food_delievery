import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/store_context.jsx';
import { ADMIN_URL } from '../../config/api.js';

const Navbar = ({ setShowLoginPop, searchQuery, setSearchQuery }) => {
  const { token, setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const logout = () => {
    localStorage.removeItem("token"); // remove by key name
    setToken("");                      // clear context
    navigate("/");                     // redirect to home
  };

  const toggleSearch = () => {
    if (searchOpen) {
      setSearchQuery("");
      setSearchOpen(false);
      return;
    }
    navigate("/");
    setSearchOpen(true);
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
        {searchOpen && (
          <input
            ref={searchInputRef}
            className="navbar-search-input"
            type="search"
            placeholder="Search dishes..."
            aria-label="Search dishes"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") toggleSearch();
            }}
          />
        )}
        <button
          className="navbar-search-button"
          type="button"
          onClick={toggleSearch}
          aria-label={searchOpen ? "Close search" : "Search dishes"}
          aria-expanded={searchOpen}
        >
          <img src={assets.search_icon} alt="" />
        </button>

        {ADMIN_URL && (
          <a
            className="navbar-admin-link"
            href={ADMIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Admin
          </a>
        )}

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
