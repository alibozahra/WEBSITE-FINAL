import React, { useState } from 'react';
import './SignUpPage.css';

const SignUpPage = ({ handlePageChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
      try {
        const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message); // Optionally alert the success message
          handlePageChange('login'); // Navigate to login page after successful signup
        } else {
          setErrorMessage(data.message); // Show error message if signup fails
        }
      } catch (error) {
        setErrorMessage('Error signing up');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Welcome to ElectroFix</h1>
        <h2>Create an account</h2>
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
              placeholder="Create a password"
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
          <p className="login-link">
            Already have an account? <a href="#" onClick={() => handlePageChange('login')}>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
