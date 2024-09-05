// src/Login.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.webp'; 

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
      const response = await fetch(`https://qa-hrs.onrender.com${endpoint}`, {
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
        <img src={logo} alt="Hotel Logo" className="logo-img" />
        <h1>{isRegistering ? 'Create Account' : 'Learner Login'}</h1>
        <h3>Welcome to the QA Hotel, Restaurant & Spa</h3>
        <p>{isRegistering ? ' Thank you for your interest in our exclusive hotel, reserved for our esteemed learners and their dedicated trainers.' : 'Thank you for registering at our exclusive hotel which is only available to our valued learners and their trainers.'}</p>
        <p>{isRegistering ? 'Once your registration is complete, you\’ll be able to explore our website to discover more about our premium amenities, including our state-of-the-art health & fitness center and our renowned partners at Mancuzo Spa. Don\’t forget to keep an eye out for exclusive offers to enhance your stay.' : 'Upon loging in, feel free to browse the website to find out more about our facilities, such as our health & fitness, plus our valued partners at Mancuzo Spa. In addition, look out for our special offers for your stay.'}</p>
        <form onSubmit={handleSubmit}>
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
