import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
} from 'react-router-dom';
import Login from './Login';
import logo from './assets/logo.webp';
import logoFooter from './assets/footer-logo.webp';

// Import your new page components
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import RestaurantPage from './pages/RestaurantPage';
import HealthFitnessPage from './pages/HealthFitnessPage';
import StudyRoomPage from './pages/StudyRoomPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';

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
        <Routes>
          {/* Layout Route that includes Navbar and Footer */}
          <Route element={<Layout handleLogout={handleLogout} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomPage />} />
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/health-fitness" element={<HealthFitnessPage />} />
            <Route path="/study" element={<StudyRoomPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Add more routes here if needed */}
          </Route>
          {/* Route for 404 page without Navbar and Footer */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

// Layout component to include Navbar and Footer
function Layout({ handleLogout }) {
  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <Outlet />
      <Footer />
    </>
  );
}

// Navbar component with hamburger menu
function Navbar({ handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <img src={logo} alt="Hotel Logo" className="navbar-logo" />

      {/* Hamburger menu icon */}
      <div
        className={`menu-icon ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navbar links */}
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rooms">Your Room</Link>
        </li>
        <li>
          <Link to="/restaurant">Restaurant & Bar</Link>
        </li>
        <li>
          <Link to="/health-fitness">Health & Fitness</Link>
        </li>
        <li>
          <Link to="/study">Study Room</Link>
        </li>
        <li>
          <Link to="/404">About</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <div className="foot">
      <div className="footer-divider"></div>
      <div className="content content-dark">
        <img src={logoFooter} alt="Hotel Logo" className="footer-logo" />
        <div className="image-flexbox">
          <div className="image-item">
            <b>Privacy</b>
          </div>
          <div className="image-item">
            <b>Terms and Conditions</b>
          </div>
        </div>
        <p>
          Our registered office and postal address is International House, 1 St
          Katharine’s Way, London, E1W 1UN
        </p>
        <p>QA is registered in England No. 2413137</p>
      </div>
    </div>
  );
}

export default App;
