import React, { useState, useEffect } from 'react';
import Login from './Login';
import logo from './assets/logo.webp'; // Import your logo
import bannerImage from './assets/home-banner.webp'; // Import your banner for the home page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userToken) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Navbar handleLogout={handleLogout} />
          <Banner image={bannerImage} /> {/* Add banner here */}
          <div className="content">
            <h1>Welcome to the QA Hotel, Restaurant & Spa</h1>
            <p>
              As soon as you approach our private hotel, you’ll immediately see the history
              steeped in the design of this beautiful building...
            </p>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

// Navbar component
function Navbar({ handleLogout }) {
  return (
    <nav className="navbar">
      <img src={logo} alt="Hotel Logo" className="navbar-logo" />
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/rooms">Your Room</a></li>
        <li><a href="/restaurant">Restaurant & Bar</a></li>
        <li><a href="/health-fitness">Health & Fitness</a></li>
        <li><a href="/study">Study Room</a></li>
        <li><a href="/about">About</a></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
}

// Banner component
function Banner({ image }) {
  return (
    <div className="banner">
      <img src={image} alt="Banner" className="banner-image" />
    </div>
  );
}

export default App;
