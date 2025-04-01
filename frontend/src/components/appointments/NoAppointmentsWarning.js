import React from 'react';
import '../../styles/NoAppointmentsWarning.css';

const NoAppointmentsWarning = () => {
  return (
    <div className="warning-container">
      <div className="warning-message">
        <h1>No Appointments Yet!</h1>
        <p>It looks like you haven't booked any appointments yet. Go ahead and schedule your first one!</p>
      </div>
    </div>
  );
};

export default NoAppointmentsWarning;
