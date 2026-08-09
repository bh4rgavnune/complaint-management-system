import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
        role: "USER"
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    }
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
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">Sign up to file complaints and track tickets across the platform.</p>
        </div>

        {error && (
          <div className="form-error-banner" style={{ marginTop: '16px' }}>
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="mono-eyebrow" style={{ marginTop: '16px', color: 'var(--ds-cyan-deep)', display: 'block', textAlign: 'center' }}>
            ✓ ACCOUNT CREATED! REDIRECTING TO LOGIN...
          </div>
        )}

        <form onSubmit={handleRegister} style={{ marginTop: '24px' }}>
          <div className="vercel-form-group">
            <label className="vercel-form-label" htmlFor="username">
              USERNAME
            </label>
            <input 
              type="text" 
              id="username"
              className="vercel-input" 
              placeholder="Pick a username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="vercel-form-group">
            <label className="vercel-form-label" htmlFor="email">
              EMAIL ADDRESS (OPTIONAL)
            </label>
            <input 
              type="email" 
              id="email"
              className="vercel-input" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Create a strong password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Create Account →
          </button>
        </form>

        <div className="auth-footer-link">
          <span>Already have an account? </span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
