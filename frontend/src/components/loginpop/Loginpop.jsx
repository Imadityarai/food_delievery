import React from 'react';
import './Loginpop.css';

const Loginpop = ({ setShowLoginPop }) => {
  // Track current mode: "signin" or "signup"
  const [currState, setCurrState] = React.useState("signin");

  return (
    <div className="loginpop-overlay" onClick={() => setShowLoginPop(false)}>
      <div className="loginpop-container" onClick={(e) => e.stopPropagation()}>
        <button className="loginpop-close" onClick={() => setShowLoginPop(false)}>×</button>

        {/* Render Sign In form */}
        {currState === "signin" && (
          <>
            <h2>Sign In</h2>
            <form className="loginpop-form">
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
            <p>
              Don’t have an account?{" "}
              <span onClick={() => setCurrState("signup")}>Go to Sign Up</span>
            </p>
          </>
        )}

        {/* Render Sign Up form */}
        {currState === "signup" && (
          <>
            <h2>Sign Up</h2>
            <form className="loginpop-form">
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
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
