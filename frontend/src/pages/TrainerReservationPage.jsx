// src/pages/TrainerReservationPage.jsx
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function TrainerReservationPage() {
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [learnerPrefix, setLearnerPrefix] = useState('');
  const [learnerFirstName, setLearnerFirstName] = useState('');
  const [learnerSurname, setLearnerSurname] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [trainerDetails, setTrainerDetails] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch trainer details
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const trainerId = decodedToken.trainer_ID;

      // Fetch trainer details with Authorization header
      fetch(`/api/trainers/${trainerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch trainer details.');
          }
          return res.json();
        })
        .then((data) => setTrainerDetails(data))
        .catch((err) => console.error('Failed to fetch trainer details:', err));
    }
  }, []);

  // Calculate number of nights whenever dates change
  useEffect(() => {
    if (checkinDate && checkoutDate) {
      const checkin = new Date(checkinDate);
      const checkout = new Date(checkoutDate);
      const timeDiff = checkout - checkin;
      const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setNumberOfNights(nights > 0 ? nights : 0);
    }
  }, [checkinDate, checkoutDate]);

  // Fetch available rooms when dates change
  useEffect(() => {
    if (checkinDate && checkoutDate) {
      const token = localStorage.getItem('token');
      fetch(
        `/api/available-rooms?checkin_date=${checkinDate}&checkout_date=${checkoutDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch available rooms.');
          }
          return res.json();
        })
        .then((data) => setAvailableRooms(data))
        .catch((err) => console.error('Failed to fetch rooms:', err));
    }
  }, [checkinDate, checkoutDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessages({});
    setSuccessMessage('');

    // Validate required fields
    let errors = {};

    if (!checkinDate) errors.checkinDate = 'Please enter a valid check-in date.';
    if (!checkoutDate) errors.checkoutDate = 'Please enter a valid checkout date.';
    if (!learnerPrefix) errors.learnerPrefix = 'This field is required.';
    if (!learnerFirstName) errors.learnerFirstName = 'This field is required.';
    if (!learnerSurname) errors.learnerSurname = 'This field is required.';
    if (!selectedRoomId) errors.selectedRoomId = 'Please select a room.';

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const trainerId = decodedToken.trainer_ID;

    fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        learner_prefix: learnerPrefix,
        learner_first_name: learnerFirstName,
        learner_surname: learnerSurname,
        room_id: selectedRoomId,
        trainer_id: trainerId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'Failed to create reservation.');
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === 'Reservation created successfully.') {
          setSuccessMessage('Booking complete and processed. Click OK to continue.');
          // Optionally, reset form fields here
          setCheckinDate('');
          setCheckoutDate('');
          setNumberOfNights(0);
          setLearnerPrefix('');
          setLearnerFirstName('');
          setLearnerSurname('');
          setSelectedRoomId('');
          setAvailableRooms([]);
        } else {
          setErrorMessages({ general: data.message });
        }
      })
      .catch((err) => {
        console.error('Failed to create reservation:', err);
        setErrorMessages({ general: err.message });
      });
  };

  return (
    <div className="reservation-page" style={{ padding: '0 10vw' }}>
      <h1 className="center-text">Room Reservation</h1>
      <form onSubmit={handleSubmit}>
        {/* Check-in Date */}
        <div className="form-group">
          <label>
            Check-in Date <span className="red-text">*</span>
          </label>
          <input
            type="date"
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
            className={`form-control ${errorMessages.checkinDate ? 'input-error' : ''}`}
          />
          {errorMessages.checkinDate && (
            <div className="error-message">{errorMessages.checkinDate}</div>
          )}
        </div>

        {/* Checkout Date */}
        <div className="form-group">
          <label>
            Checkout Date <span className="red-text">*</span>
          </label>
          <input
            type="date"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            className={`form-control ${errorMessages.checkoutDate ? 'input-error' : ''}`}
          />
          {errorMessages.checkoutDate && (
            <div className="error-message">{errorMessages.checkoutDate}</div>
          )}
        </div>

        {/* Number of Nights */}
        <div className="form-group">
          <label>Number of Nights</label>
          <input type="number" value={numberOfNights} readOnly className="form-control" />
        </div>

        {/* Learner Prefix */}
        <div className="form-group">
          <label>
            Learner Prefix <span className="red-text">*</span>
          </label>
          <select
            value={learnerPrefix}
            onChange={(e) => setLearnerPrefix(e.target.value)}
            className={`form-control ${errorMessages.learnerPrefix ? 'input-error' : ''}`}
          >
            <option value="">Select Prefix</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
            <option value="Mx">Mx</option>
            <option value="Dr">Dr</option>
          </select>
          {errorMessages.learnerPrefix && (
            <div className="error-message">{errorMessages.learnerPrefix}</div>
          )}
        </div>

        {/* Learner First Name */}
        <div className="form-group">
          <label>
            Learner First Name <span className="red-text">*</span>
          </label>
          <input
            type="text"
            value={learnerFirstName}
            onChange={(e) => setLearnerFirstName(e.target.value)}
            className={`form-control ${errorMessages.learnerFirstName ? 'input-error' : ''}`}
          />
          {errorMessages.learnerFirstName && (
            <div className="error-message">{errorMessages.learnerFirstName}</div>
          )}
        </div>

        {/* Learner Surname */}
        <div className="form-group">
          <label>
            Learner Surname <span className="red-text">*</span>
          </label>
          <input
            type="text"
            value={learnerSurname}
            onChange={(e) => setLearnerSurname(e.target.value)}
            className={`form-control ${errorMessages.learnerSurname ? 'input-error' : ''}`}
          />
          {errorMessages.learnerSurname && (
            <div className="error-message">{errorMessages.learnerSurname}</div>
          )}
        </div>

        {/* Available Rooms */}
        <div className="form-group">
          <label>
            Select Room <span className="red-text">*</span>
          </label>
          <select
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(e.target.value)}
            className={`form-control ${errorMessages.selectedRoomId ? 'input-error' : ''}`}
          >
            <option value="">Select Room</option>
            {availableRooms.map((room) => (
              <option key={room.room_id} value={room.room_id}>
                {room.room_name}
              </option>
            ))}
          </select>
          {errorMessages.selectedRoomId && (
            <div className="error-message">{errorMessages.selectedRoomId}</div>
          )}
        </div>

        {/* Trainer Details */}
        <div className="form-group">
          <label>Trainer First Name</label>
          <input
            type="text"
            value={trainerDetails.trainer_FirstName || ''}
            readOnly
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Trainer Surname</label>
          <input
            type="text"
            value={trainerDetails.trainer_Surname || ''}
            readOnly
            className="form-control"
          />
        </div>

        {/* Submit Button */}
        {errorMessages.general && (
          <div className="error-message">{errorMessages.general}</div>
        )}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <button type="submit" className="btn-submit btn-blue">
          Book Now
        </button>
      </form>
    </div>
  );
}

export default TrainerReservationPage;
