// src/pages/HomePage.jsx
import React from 'react';
import bannerImage from '../assets/home-banner.webp';
import squareBar from '../assets/square-bar.webp'; 
import squareRoom from '../assets/square-room.webp'; 
import squareSpa from '../assets/square-spa.webp';

function HomePage() {
  return (
    <>
        <div className="banner">
            <img src={bannerImage} alt="Banner" className="banner-image" />
        </div>
        <div className="content content-dark">
            <h1 class="title">Welcome to the QA Hotel,<br/> Restaurant & Spa</h1>
            <p>
            As soon as you approach our private hotel, you’ll immediately see the history steeped in the design of this beautiful building. And as you enter the hotel lobby you’ll feel relaxed after your journey as you’re greeted by the friendly faces and smiles of our staff who can’t wait to assist you and get you checked in. From our amazing receptionists to our concierge, you are guaranteed a warm welcome.
           </p>
         </div>
         <div className="content">
           <p>
             As well as the hotel lobby, on the ground floor you will find our restaurant plus the 'Queen Anne' bar from which the company name was created (more on that in the about page). We've also separated the bar area from the restaurant so you can sit and enjoy a quiet drink away from the bustle and noise of our restaurant.
           </p>
           <p>
             On the top floor, with views over London, is the study room. This is a quiet area away from your room in which to study or just read your favourite novel. Either way, it’s yours to use.
           </p>
           <p>
             The hotel also offers a Gym, Swimming Pool and Jacuzzi as well as access to our valued partners at the Mancuzo Spa.
           </p>
           <p class="center-text">
             <b>We look forward to welcoming you and hope you enjoy your stay.</b>
           </p>

           <div className="image-flexbox">
             <div className="image-item">
               <h2>Restuartant & Bar</h2>
               <img src={squareBar} alt="Restaurant and Bar" />
             </div>
             <div className="image-item">
               <h2>Your Room</h2>
               <img src={squareRoom} alt="Your Room" />
             </div>
             <div className="image-item">
               <h2>Heath, Fitness & Spa</h2>
               <img src={squareSpa} alt="Health, Fitness and Spa" />
             </div>
           </div>
        </div>
    </>
  );
}

export default HomePage;
