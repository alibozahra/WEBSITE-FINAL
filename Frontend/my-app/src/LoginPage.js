import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ handlePageChange, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
    } else {
      setErrorMessage('');
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message); // Optionally alert the success message
          handleLogin(); // Call handleLogin from App.js to redirect to the home page
        } else {
          setErrorMessage(data.message); // Show error message if login fails
        }
      } catch (error) {
        setErrorMessage('Error logging in');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome to ElectroFix</h1>
        <h2>Login to your account</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          <p className="signup-link">
            Don't have an account? <a href="#" onClick={() => handlePageChange('signup')}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
