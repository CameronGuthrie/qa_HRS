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
              As soon as you approach our private hotel, you’ll immediately see the history steeped in the design of this beautiful building. And as you enter the hotel lobby you’ll feel relaxed after your journey as you’re greeted by the friendly faces and smiles of our staff who can’t wait to assist you and get you checked in. From our amazing receptionists to our concierge, you are guaranteed a warm welcome.
            </p>
          </div>
          <p>
            As well as the hotel lobby, on the ground floor you will find our restaurant plus the 'Queen Anne' bar from which the company name was created (more on that in the about page). We've also separated the bar area from the restaurant so you can sit and enjoy a quiet drink away from the bustle and noise of our restaurant.
          </p>
          <p>
            On the top floor, with views over London, is the study room. This is a quiet area away from your room in which to study or just read your favourite novel. Either way, it’s yours to use.
          </p>
          <p>
            The hotel also offers a Gym, Swimming Pool and Jacuzzi as well as access to our valued partners at the Mancuzo Spa.
          </p>
          <p>
            <b>We look forward to welcoming you and hope you enjoy your stay.</b>
          </p>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

// Navbar component with hamburger menu
function Navbar({ handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <img src={logo} alt="Hotel Logo" className="navbar-logo" />
      
      {/* Hamburger menu icon */}
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navbar links */}
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
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
