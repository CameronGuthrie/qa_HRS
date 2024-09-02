// src/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate email format before making the request
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const endpoint = isRegistering ? '/register' : '/login';
      //const endpoint = isRegistering ? '/api/register' : '/api/login';
      const response = await fetch(`https://qa-hrs-backend.onrender.com${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error during registration');
      }

      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>{isRegistering ? 'Create Account' : 'Welcome Back!'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faKey} className="icon" />
            <input
              type={showPassword ? "text" : "password"}  // Toggle between text and password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}  // Swap icons logic
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}  // Toggle showPassword state
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-submit">
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <p className="toggle-text">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span className="toggle-link" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Login' : 'Register'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
