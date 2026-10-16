import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/api";
import "./AdminLogin.css";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, { username, password });
      if (!response.data.success) {
        setError(response.data.message || "Unable to sign in");
        return;
      }
      onLogin(response.data.token);
    } catch (requestError) {
      console.error("Admin login failed:", requestError);
      setError(requestError.response?.data?.message || "Unable to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-login">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h1>Admin sign in</h1>
        <label>
          Username
          <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
        </label>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;
