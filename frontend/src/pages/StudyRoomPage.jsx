// src/pages/StudyRoomPage.jsx
import React from 'react';
import bannerImage from '../assets/study-banner.webp';
import squareStudy1 from '../assets/square-study-1.webp';

function StudyRoomPage() {
  return (
    <>
      <div className="banner">
          <img src={bannerImage} alt="Banner" className="banner-image" />
      </div>
      <div className="content content-dark">
          <h1 class="title green-text"><b>Study Room</b></h1>
          <p>
            Shhhhh 🤫
          </p>
        </div>
        <div className="content">
          <p class="center-text">
            On the top floor with spectacular views of London, you will find the study room.</p>
          <p class="center-text">
            This is a unique large space in which to do your own work or just chill out and read your favorite book.
          </p>

          <div className="image-flexbox">
            <div className="image-item">
              <img src={squareStudy1} alt="" />
            </div>
          </div>

          <h2>Let's give you some head space</h2>
          <p>
            In addition to the hotel facilities, QA recognises the need for both trainers and learners to have a separate quiet area in which to get stuff done.
          </p>

          <p>
            And whilst, as a trainer, you may choose to do that in your room, it’s important for your well-being to be able to separate catching up on work admin from relaxing, and to have a quiet  area within the hotel, with full internet access in which to do that.
          </p>

          <p>
            We’ve made this as quiet and relaxing as possible with soft furnishings as well as study tables. Plenty of power sockets
            <br/>
            and views overlooking London.
          </p>

          <p>
            This area is free to all who choose to use it, but to also be mindful of others.
          </p>

          <h2>You've got this 😇</h2>

        </div>
      </>
    );
}

export default StudyRoomPage;
