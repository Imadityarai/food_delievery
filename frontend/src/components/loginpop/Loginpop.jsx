import React, { useState, useContext } from 'react';
import './loginpop.css';
import axios from "axios";
import { StoreContext } from '../../context/store_context';
import { API_URL } from "../../config/api";

const Loginpop = ({ setShowLoginPop }) => {
  //  Access context inside the component
  const { setToken } = useContext(StoreContext);

  // Track current mode: "signin" or "signup"
  const [currState, setCurrState] = useState("signin");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const onChangeHand = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  // Handle login/register
  const onLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    let user_url = `${API_URL}/api/user`;
    user_url += currState === "signin" ? "/login" : "/register";

    try {
      const res = await axios.post(user_url, data);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLoginPop(false);
      } else {
        setErrorMessage(res.data.message || "Unable to sign in.");
      }
    } catch (err) {
      console.error("Account request failed:", err);
      if (err.response) {
        setErrorMessage(err.response.data?.message || `Request failed (${err.response.status}).`);
      } else {
        setErrorMessage(`Could not reach the API at ${API_URL}. Check Vercel's VITE_API_URL and the API's CLIENT_ORIGINS settings.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="loginpop-overlay" onClick={() => setShowLoginPop(false)}>
      <div className="loginpop-container" onClick={(e) => e.stopPropagation()}>
        <button className="loginpop-close" onClick={() => setShowLoginPop(false)}>×</button>

        {currState === "signin" ? (
          <>
            <h2>Sign In</h2>
            <form className="loginpop-form" onSubmit={onLogin}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={onChangeHand}
                autoComplete="email"
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={onChangeHand}
                autoComplete="current-password"
                required
              />
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Login"}</button>
            </form>
            <p>
              Don’t have an account?{" "}
              <span onClick={() => { setErrorMessage(""); setCurrState("signup"); }}>Go to Sign Up</span>
            </p>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <form className="loginpop-form" onSubmit={onLogin}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={data.name}
                onChange={onChangeHand}
                autoComplete="name"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={onChangeHand}
                autoComplete="email"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={onChangeHand}
                autoComplete="new-password"
                minLength={8}
                required
              />
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Register"}</button>
            </form>
            {errorMessage && <p className="loginpop-error" role="alert">{errorMessage}</p>}
            <p>
              Already have an account?{" "}
              <span onClick={() => { setErrorMessage(""); setCurrState("signin"); }}>Go to Sign In</span>
            </p>
          </>
        )}
        {currState === "signin" && errorMessage && <p className="loginpop-error" role="alert">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Loginpop;
