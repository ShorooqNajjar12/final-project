import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); 

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div className={`notification ${visible ? 'visible' : ''}`}>{message}</div>;
};

export default Notification;
