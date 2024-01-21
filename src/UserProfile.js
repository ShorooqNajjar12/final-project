import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {user ? (
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Balance:</strong> ${user.balance}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default UserProfile;
