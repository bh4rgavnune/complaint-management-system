import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    axios.post("http://localhost:8080/api/auth/login", { username, password })
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
        if (res.data.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/my-complaints";
        }
      })
      .catch(() => setError("Invalid username or password credentials."));
  };

  return (
    <div className="auth-vercel-page">
      <div className="vercel-card-large auth-card">
        <div className="auth-brand-head">
          <div className="vercel-logo-mark" style={{ justifyContent: 'center', marginBottom: '8px' }}>
            <svg viewBox="0 0 75 65" height="24" fill="currentColor">
              <path d="M37.5 0L75 65H0z" />
            </svg>
          </div>
          <h2 className="auth-title">Log in to Complaint System</h2>
          <p className="auth-subtitle">Enter your credentials to access your user ledger or administrative dashboard.</p>
        </div>

        {error && (
          <div className="form-error-banner" style={{ marginTop: '16px' }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ marginTop: '24px' }}>
          <div className="vercel-form-group">
            <label className="vercel-form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="vercel-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="vercel-form-group">
            <label className="vercel-form-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="vercel-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Log In →
          </button>
        </form>

        <div className="auth-footer-link">
          <span>Don't have an account? </span>
          <Link to="/register">Sign up for free</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
