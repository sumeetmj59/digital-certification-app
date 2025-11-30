// src/components/Profile.js
import React from 'react';

function Profile({ user }) {
  return (
    <div style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <h3>👤 Profile</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Student ID:</strong> {user.studentId}</p>
      <p><strong>Certificates Completed:</strong> 3</p> {/* static for now */}
    </div>
  );
}

export default Profile;