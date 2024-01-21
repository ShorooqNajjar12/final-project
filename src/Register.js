import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('select');  
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [emailExists, setEmailExists] = useState(false); 
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailAlreadyExists = existingUsers.some((user) => user.email === email);

    if (emailAlreadyExists) {
      setEmailExists(true);
      return;
    }

    const type = userType;
    const balance = type === 'client' ? Math.floor(Math.random() * 100) + 1 : 0;
    const newUser = { name, email, password, balance, type };
    onRegister(newUser);

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setRegistrationStatus('Registration completed!');
    setEmailExists(false); 
    setTimeout(() => {
      setRegistrationStatus('');
      navigate('/');
    }, 2000);
  };

  return (
    <div>
      <h2>Register</h2>
      {registrationStatus && <p>{registrationStatus}</p>}
      {emailExists && <p>Email already exists. Please use a different email.</p>}
      <form onSubmit={handleRegisterSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Type:</label>
        <select name="type" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="select">Click here</option>
          <option value="client">Client</option>
          <option value="contractor">Contractor</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
