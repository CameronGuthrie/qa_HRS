// src/pages/HealthFitnessPage.jsx
import React from 'react';
import bannerImage from '../assets/gym-banner.webp';
import squareGym1 from '../assets/square-gym-1.webp';
import squareGym2 from '../assets/square-gym-2.webp';
import squareGym3 from '../assets/square-gym-3.webp';
import squareGym4 from '../assets/square-gym-4.webp';

function HealthFitnessPage() {
  return (
    <>
      <div className="banner">
          <img src={bannerImage} alt="Banner" className="banner-image" />
      </div>
      <div className="content content-dark">
          <h1 class="title">Health & Fitness</h1>
          <p>
            Stay healthy
          </p>
        </div>
        <div className="content">
          <p class="center-text">
            Spending the day in a training room, even though you may be standing as you're delivering does mean you're not moving around as much as you'd hope. And that's why we wanted to add a gym, pool and jacuzzi into the mix for you.
          </p>
          <h2>Fitness Gym 🏋️‍♂️</h2>
          <p class="center-text">
            The gym is fully equipped and free to use for those who prefer a really good workout. And fo those that don't  feel free to use our yoga/pilates mats for those wanting strength conditioning or a old good stretch. 
          </p>

          <p class="center-text">
            No need to book, the gym is located on the ground floor and is during these hours
            <br/><b>06:30hrs to 22:00hrs</b> (closed weekends).
          </p>

          <p class="center-text">
            Please note that the gym is not staffed, although there are security cameras and we inspect the gym every hour. 
          </p>

          <p class="center-text">
            No need to bring towels, they are available at the gym.  
          </p>

          <div className="image-flexbox">
            <div className="image-item">
              <img src={squareGym1} alt="" />
            </div>
            <div className="image-item">
              <img src={squareGym2} alt="" />
            </div>
            <div className="image-item">
              <img src={squareGym3} alt="" />
            </div>
            <div className="image-item">
              <img src={squareGym4} alt="" />
            </div>
          </div>

          <h2>Pool & Jacuzzi</h2>
          <p class="center-text">
            ,The swimming pool is not open to the public, so you and your trainer get exclusive access to it. 
          </p>

          <p class="center-text">
            However, the pool is not massive and the hotel can accommodate up to 33 guests. With that in mind, so that everyone gets the opportunity to swim and use the jacuzzi, we have <b>swimming slots that you can book on to for max of an hour with no more than 9 guests using the pool facilities at any one time.</b>
          </p>

          <p class="center-text">
            A qualified life guard will be monitoring at all times 
          </p>

          <p class="center-text">
            <b>Pool & Jacuzzi hours are between: -</b>
            <br/>
            6am-9am incl.
            <br/>
            12pm- 2pm incl.
            <br/>
            4pm-8pm incl.
          </p>
          <p class="center-text">
            <b>Please book via reception in advance.</b>
            <br/>
            Towels are available in the changing rooms.
          </p>
        </div>
      </>
    );
}

export default HealthFitnessPage;
