import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import TransactionForm from './TransactionForm';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = ({ user, onTransaction, notifications }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (notifications.length > 0) {
      setNotification(notifications[0]);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  }, [notifications]);

  const handleTransactionSubmit = async () => {
    const transactionData = { recipient, amount };
    try {
      const status = await onTransaction(transactionData);
  
      if (status === 'success') {
        setTransactionStatus('Transaction successful!');
        setRecipient('');
        setAmount('');
        setTimeout(() => {
          setTransactionStatus('');
        }, 5000);
      } else {
        setTransactionStatus(`Transaction failed: ${status}`);
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      setTransactionStatus('Transaction failed. Please try again.');
    }
  };
  

  const handleLogout = () => {
    setRecipient('');
    setAmount('');
    setTransactionStatus('');
    setNotification('');
    navigate('/');
  };

  return (
    <div>
      <UserProfile user={user} />
      <h2>Client Dashboard</h2>
      <TransactionForm
        recipient={recipient}
        amount={amount}
        onRecipientChange={(e) => setRecipient(e.target.value)}
        onAmountChange={(e) => setAmount(e.target.value)}
        onSubmit={handleTransactionSubmit}
        transactionStatus={transactionStatus}
      />
      <button onClick={handleLogout}>Logout</button>
      {notification && <Notification message={notification} />}
    </div>
  );
};

export default ClientDashboard;
