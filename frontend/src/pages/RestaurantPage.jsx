// src/pages/RestaurantPage.jsx
import React from 'react';
import bannerImage from '../assets/restaurant-banner.webp';
import squareRestaurant1 from '../assets/square-restaurant-1.webp';
import squareRestaurant2 from '../assets/square-restaurant-2.webp';
import squareRestaurant3 from '../assets/square-restaurant-3.webp';
import squareRestaurant4 from '../assets/square-restaurant-4.webp';
import squareRestaurant5 from '../assets/square-restaurant-5.webp';
import squareRestaurant6 from '../assets/square-restaurant-6.webp';
import squareRestaurant7 from '../assets/square-restaurant-7.webp';
import squareRestaurant8 from '../assets/square-restaurant-8.webp';
import squareRestaurant9 from '../assets/square-restaurant-9.webp';
import squareRestaurant10 from '../assets/square-restaurant-10.webp';

function RestaurantPage() {
  return (
  <>
    <div className="banner">
        <img src={bannerImage} alt="Banner" className="banner-image" />
    </div>
    <div className="content content-dark">
        <h1 class="title">Resturant & Bar</h1>
        <p>
          Delicious!
        </p>
      </div>
      <div className="content">
        <p class="center-text">
          Welcome to our restaurant and the Queen Anne bar. 
        </p>
        <p class="center-text">
          Our amazing chefs are ready to infuse your taste buds and make you want to return. Whether that's for breakfast to set you up for the day, or in the evening to nourish you from a day of training. 
        </p>
        <h2>Your day starts with breakfast</h2>
        <p>
          %From a light continental breakfast of fresh fruit, juice and pastries, to a full English. You decide how you want to start your day before you join your learners on your course.
        </p>
        <p>
          No need to book, breakfast is included with your stay and is <b>open between 06:00hrs and 09:00hrs</b> (closed weekends)
        </p>
        <div className="image-flexbox">
          <div className="image-item">
            <img src={squareRestaurant1} alt="" />
          </div>
          <div className="image-item">
            <img src={squareRestaurant2} alt="" />
          </div>
          <div className="image-item">
            <img src={squareRestaurant3} alt="" />
          </div>
          <div className="image-item">
            <img src={squareRestaurant4} alt="" />
          </div>
        </div>
        <h2>Then arrive back at the hotel</h2>
        <p class="center-text">
          And join your learners or fellow trainers for an evening gourmet meal and enticing desserts.
        </p>
        <p class="center-text">
          Opens at 17:30hrs and closes promptly at 22:00hrs with last orders taken at 20:30hrs. 
        </p>
        <div className="image-flexbox">
          <div className="image-item">
            <img src={squareRestaurant5} alt="" />
          </div>
          <div className="image-item">
            <img src={squareRestaurant6} alt="" />
          </div>
          <div className="image-item">
            <img src={squareRestaurant7} alt="" />
          </div>
        </div>
        <h2>Finally..</h2>
        <p class="center-text">
          Visit the Queen Anne Bar for social drinks or a quick drink before retiring to your room.
        </p>
        <p class="center-text">
          The bar is open from 5:30pm - 11:30pm.
        </p>
        <div className="image-flexbox">
          <div className="image-item">
            <img src={squareRestaurant8} alt="" />
          </div>
          <div className="image-item">
            <img src={squareRestaurant9} alt="" />
          </div>
          <div className="image-item">
            <img src={squareRestaurant10} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantPage;
