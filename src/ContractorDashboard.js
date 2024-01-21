import React, { useEffect } from 'react';
import UserProfile from './UserProfile';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';

const ContractorDashboard = ({ user, notifications }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((notification, index) => {
        return <Notification key={index} message={notification} />;
      });
    }
  }, [notifications]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <UserProfile user={user} />
      <h2>Contractor Dashboard</h2>
      {}
      {notifications.length > 0 && (
        <div>
          <h3>Notifications</h3>
          {notifications.map((notification, index) => (
            <Notification key={index} message={notification} />
          ))}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ContractorDashboard;
