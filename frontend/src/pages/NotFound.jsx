// src/pages/NotFound.jsx
import React from 'react';
import lost from '../assets/lost.webp';

function NotFound() {
  return (
    <div style={{ padding: '0 10vw'}}>
      <div className="image-flexbox">
        <div className="image-item">
          <div class="left-text">
            <span class="four-o-four red-text left-text">Where am I?</span>
            <h1 class="left-text">Looks like we're both lost.</h1>
            <p>
              The page you’re looking for doesn’t exist or has been moved.</p>
            <p>
              Please return to <b><a href="/" class="red-text">homepage.</a></b>
            </p>
          </div>
        </div>
        <div className="image-item">
          <img src={lost} alt="" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;