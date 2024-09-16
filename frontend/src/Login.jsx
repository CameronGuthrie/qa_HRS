// src/Login.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faKey,
  faEye,
  faEyeSlash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.webp';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Modes: 'login', 'register', 'trainer'
  const [mode, setMode] = useState('login');

  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // State variables for individual field errors
  const [firstNameError, setFirstNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateName = (name) => {
    const re = /^[A-Za-z0-9 ]+$/;
    return re.test(String(name));
  };

  const handleFirstNameBlur = () => {
    if (!firstName.trim()) {
      setFirstNameError('This field is required');
    } else if (!validateName(firstName)) {
      setFirstNameError('Only letters, numbers or spaces are valid');
    } else {
      setFirstNameError('');
    }
  };

  const handleSurnameBlur = () => {
    if (!surname.trim()) {
      setSurnameError('This field is required');
    } else if (!validateName(surname)) {
      setSurnameError('Only letters, numbers or spaces are valid');
    } else {
      setSurnameError('');
    }
  };

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setEmailError('This field is required');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError('This field is required');
    } else if (password.length < 6) {
      setPasswordError('Please enter at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('This field is required');
    } else if (confirmPassword.length < 6) {
      setConfirmPasswordError('Please enter at least 6 characters');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Please enter the same password as above');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Reset all errors
    setFirstNameError('');
    setSurnameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');

    let hasError = false;

    // Perform validations
    if (mode === 'register') {
      if (!firstName.trim()) {
        setFirstNameError('This field is required');
        hasError = true;
      } else if (!validateName(firstName)) {
        setFirstNameError('Only letters, numbers or spaces are valid');
        hasError = true;
      }

      if (!surname.trim()) {
        setSurnameError('This field is required');
        hasError = true;
      } else if (!validateName(surname)) {
        setSurnameError('Only letters, numbers or spaces are valid');
        hasError = true;
      }

      if (!email.trim()) {
        setEmailError('This field is required');
        hasError = true;
      } else if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        hasError = true;
      }

      if (!password) {
        setPasswordError('This field is required');
        hasError = true;
      } else if (password.length < 6) {
        setPasswordError('Please enter at least 6 characters');
        hasError = true;
      }

      if (!confirmPassword) {
        setConfirmPasswordError('This field is required');
        hasError = true;
      } else if (confirmPassword.length < 6) {
        setConfirmPasswordError('Please enter at least 6 characters');
        hasError = true;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError('Please enter the same password as above');
        hasError = true;
      }

      if (!termsAccepted) {
        setTermsError('You must accept the Terms & Conditions');
        hasError = true;
      }
    } else if (mode === 'login' || mode === 'trainer') {
      // Login validations
      if (!email.trim()) {
        setEmailError('This field is required');
        hasError = true;
      } else if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        hasError = true;
      }

      if (!password) {
        setPasswordError('This field is required');
        hasError = true;
      } else if (password.length < 6) {
        setPasswordError('Please enter at least 6 characters');
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    try {
      let endpoint = '';
      let body = {};

      if (mode === 'register') {
        endpoint = '/register';
        body = { email, password, firstName, surname };
      } else if (mode === 'login') {
        endpoint = '/login';
        body = { email, password };
      } else if (mode === 'trainer') {
        endpoint = '/trainer-login';
        body = { email, password };
      }

      // Use relative URL
      const response = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error during authentication');
      }

      if (data.token && typeof onLogin === 'function') {
        onLogin(data.token);
      } else {
        setGeneralError('No token received from the server.');
      }
    } catch (err) {
      setGeneralError(err.message);
      console.error('Error during submission:', err);
    }
  };

  return (
    <div className={`login-wrapper ${mode === 'trainer' ? 'trainer-mode' : ''}`}>
      <div className="login-container">
        <img src={logo} alt="Hotel Logo" className="logo-img" />
        <h1>
          {mode === 'register'
            ? 'Create Account'
            : mode === 'login'
            ? 'Learner Login'
            : 'Trainer Login'}
        </h1>
        <h3>Welcome to the QA Hotel, Restaurant & Spa</h3>
        <p>
          {mode === 'register'
            ? 'Thank you for your interest in our exclusive hotel...'
            : 'Thank you for registering...'}
        </p>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              {/* First Name Field */}
              <div className="form-group">
                {firstNameError && (
                  <div className="error-message">{firstNameError}</div>
                )}
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={handleFirstNameBlur}
                  required
                  placeholder="First Name"
                  className={`form-control ${
                    firstNameError ? 'input-error' : ''
                  }`}
                />
              </div>

              {/* Surname Field */}
              <div className="form-group">
                {surnameError && (
                  <div className="error-message">{surnameError}</div>
                )}
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  onBlur={handleSurnameBlur}
                  required
                  placeholder="Surname"
                  className={`form-control ${
                    surnameError ? 'input-error' : ''
                  }`}
                />
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="form-group">
            {emailError && <div className="error-message">{emailError}</div>}
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              required
              placeholder="Email"
              className={`form-control ${emailError ? 'input-error' : ''}`}
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
            <FontAwesomeIcon icon={faKey} className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              required
              placeholder="Password"
              className={`form-control ${passwordError ? 'input-error' : ''}`}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {mode === 'register' && (
            <>
              {/* Confirm Password Field */}
              <div className="form-group">
                {confirmPasswordError && (
                  <div className="error-message">{confirmPasswordError}</div>
                )}
                <FontAwesomeIcon icon={faKey} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={handleConfirmPasswordBlur}
                  required
                  placeholder="Confirm Password"
                  className={`form-control ${
                    confirmPasswordError ? 'input-error' : ''
                  }`}
                />
              </div>

              {/* Terms & Conditions */}
              <div className="form-group terms-conditions">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  id="terms"
                />
                <label htmlFor="terms">I accept the Terms & Conditions</label>
                {termsError && (
                  <div className="error-message">{termsError}</div>
                )}
              </div>
            </>
          )}

          {generalError && <div className="error-message">{generalError}</div>}
          <button
            type="submit"
            className={`btn-submit ${mode === 'trainer' ? 'btn-blue' : ''}`}
          >
            {mode === 'register'
              ? 'Register'
              : mode === 'login'
              ? 'Login'
              : 'Trainer Login'}
          </button>

          {/* Toggle Links */}
          {mode === 'login' && (
            <>
              <p className="toggle-text">
                Don't have an account?{' '}
                <span
                  className="toggle-link"
                  onClick={() => {
                    setMode('register');
                    // Reset errors when toggling
                    setFirstNameError('');
                    setSurnameError('');
                    setEmailError('');
                    setPasswordError('');
                    setConfirmPasswordError('');
                    setTermsError('');
                    setGeneralError('');
                  }}
                >
                  Register
                </span>
              </p>
              <p className="toggle-text">
                Are you a trainer?{' '}
                <span
                  className="toggle-link"
                  onClick={() => {
                    setMode('trainer');
                    // Reset errors when toggling
                    setEmailError('');
                    setPasswordError('');
                    setGeneralError('');
                  }}
                >
                  Trainer Login
                </span>
              </p>
            </>
          )}

          {mode === 'register' && (
            <p className="toggle-text">
              Already have an account?{' '}
              <span
                className="toggle-link"
                onClick={() => {
                  setMode('login');
                  // Reset errors when toggling
                  setFirstNameError('');
                  setSurnameError('');
                  setEmailError('');
                  setPasswordError('');
                  setConfirmPasswordError('');
                  setTermsError('');
                  setGeneralError('');
                }}
              >
                Login
              </span>
            </p>
          )}

          {mode === 'trainer' && (
            <p className="toggle-text">
              Not a trainer?{' '}
              <span
                className="toggle-link"
                onClick={() => {
                  setMode('login');
                  // Reset errors when toggling
                  setEmailError('');
                  setPasswordError('');
                  setGeneralError('');
                }}
              >
                Back to Login
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
