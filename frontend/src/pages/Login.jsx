import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/auth/login", { username, password })
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
        if (res.data.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/my-complaints";
        }
      })
      .catch(() => alert("Invalid credentials"));
  };

  return (
    <div className="login-container">
      <div className="login-box glass-panel">
        <h2>System Login</h2>
        <p>Authenticate for administrative access.</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              <span className="dot dot-primary"></span> Username
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              <span className="dot dot-secondary"></span> Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn login-btn">Login</button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--on-surface-variant, #adaaaa)' }}>Don't have an account? </span>
          <Link to="/register" style={{ color: '#69f6b8', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
