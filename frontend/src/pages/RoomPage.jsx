// src/pages/RoomPage.jsx
import React, { useState, useEffect } from 'react';
import bannerImage from '../assets/home-banner.webp';

// Import your carousel images
import image1 from '../assets/room1.webp';
import image2 from '../assets/room2.webp';
import image3 from '../assets/room3.webp';
import image4 from '../assets/room4.webp';
import image5 from '../assets/room5.webp';

function RoomPage() {
  // Array of images for the carousel
  const images = [image1, image2, image3, image4, image5];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous image
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5000ms = 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  return (
    <>
      <div className="banner">
        <img src={bannerImage} alt="Banner" className="banner-image" />
      </div>
      <div className="content content-dark">
        <h1 className="title yellow-text">Your Room</h1>
        <p>Relax, we've got this....</p>
      </div>
      <div className="content">
        <p className="center-text">
          We understand learning, and we understand how tiring being a trainer
          is. So, given that you are training our most valued clients, it's only
          right that you get to the best rooms.
        </p>
        <p className="center-text">
          We want you to have an amazing night's rest. Which is why in your room
          we've provided King-sized beds, installed soundproofing so you're not
          disturbed by other 'guests' and not only a shower, but a bath too.
        </p>
        <p className="center-text">
          We appreciate the work you do for QA, knowing that your teaching is
          making a difference.
        </p>
        <p className="center-text">
          Please note that the gym is not staffed, although there are security
          cameras and we inspect the gym every hour.
        </p>
        <p className="center-text">
          In your room we have provided not only complementary items, but also a
          25% discount card to Mancuso Spa valid for the time you are staying
          with us.
        </p>

        {/* Carousel Component */}
        <div className="carousel">
          <button onClick={handlePrev} className="carousel-button prev">
            &#10094;
          </button>
          <div className="carousel-image-item">
            <img
              src={images[currentIndex]}
              alt={`Room ${currentIndex + 1}`}
              className="carousel-image"
            />
          </div>
          <button onClick={handleNext} className="carousel-button next">
            &#10095;
          </button>
        </div>

        <h2>We seriously want you to enjoy a truly restful night's sleep.</h2>
        <p>
          In your room you will find:
          <ul>
            <li>King-size bed</li>
            <li>Blackout curtains</li>
            <li>Large Wardrobe</li>
            <li>
              Luxurious Ensuite bathroom (bath and Shower) with towels, quality
              bathrobes & slippers
            </li>
            <li>Sky/BT television including sports & film package</li>
            <li>Direct dial telephone</li>
            <li>Digital radio alarm clock with Bluetooth & USB</li>
            <li>Personal safe</li>
            <li>Hairdryer</li>
            <li style={{ fontSize: '1.2em' }}>
              USB, 3-pin and C-plug (European) sockets
            </li>
            <li>Still and sparkling mineral water</li>
            <li>Nespresso machine and tea making facilities</li>
            <li>Luxury toiletries</li>
            <li>Small fridge with complementary soft drinks</li>
            <li>
              Complimentary Wi-Fi access throughout the hotel (code given upon
              check-in)
            </li>
          </ul>
        </p>
        <h2>Sleep Well 😴</h2>
      </div>
    </>
  );
}

export default RoomPage;
