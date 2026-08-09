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
      // The backend expects username, password, and role.
      // We default the role to "USER" for self-registration.
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
        role: "USER"
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="register-page-container">
      <div className="form-box">
        <form className="form" onSubmit={handleRegister}>
          <span className="title">Sign up</span>
          <span className="subtitle">Create a free account with your email.</span>
          
          {error && <div className="register-error-msg">❌ {error}</div>}
          {success && <div className="register-success-msg">✅ Account created! Redirecting...</div>}
          
          <div className="form-container">
            <input 
              type="text" 
              className="input" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <input 
              type="email" 
              className="input" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              className="input" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
        <div className="form-section">
          <p>Have an account? <Link to="/login">Log in</Link> </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
