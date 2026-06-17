import React, { useState, useContext } from 'react';
import './Loginpop.css';
import axios from "axios";
import { StoreContext } from '../../context/store_context';

const Loginpop = ({ setShowLoginPop }) => {
  // ✅ Access context inside the component
  const { token, setToken } = useContext(StoreContext);

  // Track current mode: "signin" or "signup"
  const [currState, setCurrState] = useState("signin");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const onChangeHand = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
    console.log(data);
  };

  // Handle login/register
  const onLogin = async (event) => {
    event.preventDefault();
    let user_url = "http://localhost:4000/api/user";
    user_url += currState === "signin" ? "/login" : "/register";

    try {
      const res = await axios.post(user_url, data);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLoginPop(false);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
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
                type="text"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={onChangeHand}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={onChangeHand}
              />
              <button type="submit">Login</button>
            </form>
            <p>
              Don’t have an account?{" "}
              <span onClick={() => setCurrState("signup")}>Go to Sign Up</span>
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
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={onChangeHand}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={onChangeHand}
              />
              <button type="submit">Register</button>
            </form>
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("signin")}>Go to Sign In</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Loginpop;
