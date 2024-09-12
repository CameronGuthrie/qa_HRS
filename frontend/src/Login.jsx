// src/Login.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.webp'; 

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    if (isRegistering && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
  
    try {
      const endpoint = isRegistering ? '/register' : '/login';
      const response = await fetch(`https://qa-hrs.onrender.com${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          isRegistering 
            ? { email, password, firstName, surname } 
            : { email, password }
        ),
      });
  
      const data = await response.json();
      console.log('API Response:', data);  // Log the API response for debugging
  
      if (!response.ok) {
        throw new Error(data.message || 'Error during registration or login');
      }
  
      if (data.token && typeof onLogin === 'function') {
        onLogin(data.token);
      } else {
        setError('No token received from the server.');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error during submission:', err);  // Log any errors encountered
    }
  };
  
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src={logo} alt="Hotel Logo" className="logo-img" />
        <h1>{isRegistering ? 'Create Account' : 'Learner Login'}</h1>
        <h3>Welcome to the QA Hotel, Restaurant & Spa</h3>
        <p>{isRegistering ? 'Thank you for your interest in our exclusive hotel...' : 'Thank you for registering...'}</p>
        
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="First Name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                  placeholder="Surname"
                  className="form-control"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faKey} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="form-control"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <FontAwesomeIcon icon={faKey} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                className="form-control"
              />
            </div>
          )}

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
