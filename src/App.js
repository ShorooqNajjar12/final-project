import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import ContractorDashboard from './ContractorDashboard';
import ClientDashboard from './ClientDashboard';
import Notification from './Notification';
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationsForRecipient, setNotificationsForRecipient] = useState([]);
  
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleRegister = (user) => {
    setUsers([...users, user]);
    localStorage.setItem('users', JSON.stringify([...users, user]));
  };

  const handleLogin = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    setCurrentUser(user);
    return user;
  };

  const handleTransaction = (transactionData) => {
    if (!currentUser) {
      console.error('User not logged in');
      return 'failure: User not logged in';
    }
  
    const { recipient, amount } = transactionData;
    const sender = users.find((u) => u.email === currentUser.email);
    const receiver = users.find((u) => u.email === recipient);
  
    if (!sender || !receiver) {
      console.error('Sender or recipient not found');
      return 'failure: Sender or recipient not found';
    }
  
    const transactionAmount = parseFloat(amount);
  
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      console.error('Invalid transaction amount');
      return 'failure: Invalid transaction amount';
    }
  
    if (sender.balance >= transactionAmount) {
      if (receiver.type === 'contractor') {
        sender.balance -= transactionAmount;
        receiver.balance += transactionAmount;
  
        setCurrentUser({ ...sender });
  
        const updatedUsers = users.map((u) => (u.email === sender.email ? sender : (u.email === receiver.email ? receiver : u)));
        setUsers(updatedUsers);
  
        localStorage.setItem('users', JSON.stringify(updatedUsers));
  
        const senderNotification = `Transaction successful! You sent $${transactionAmount} to ${receiver.name}.`;
        setNotification(senderNotification);
  
        const receiverNotification = `You received $${transactionAmount} from ${sender.name}.`;
        setNotificationsForRecipient([...notificationsForRecipient, receiverNotification]);
  
        setTimeout(() => {
          setNotification(null);
          setNotificationsForRecipient([]);
        }, 5000);
  
        return 'success';
      } else {
        console.error('Invalid recipient. You can only send money to contractors.');
        return 'failure: Invalid recipient. You can only send money to contractors.';
      }
    } else {
      console.error('Insufficient balance');
      return 'failure: Insufficient balance';
    }
  };
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/profile" element={<UserProfile user={currentUser} />} />
        <Route
          path="/client-dashboard"
          element={<ClientDashboard user={currentUser} onTransaction={handleTransaction} notifications={notificationsForRecipient} />}
        />
        <Route
          path="/contractor-dashboard"
          element={<ContractorDashboard user={currentUser} notifications={notificationsForRecipient} />}
        />
      </Routes>
      {notification && <Notification message={notification} />}
    </Router>
  );
}

export default App;
