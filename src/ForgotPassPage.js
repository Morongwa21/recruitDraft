// src/components/ForgotPasswordPage.js

import React, { useState } from 'react';
import './components/ForgotPassword.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const ForgotPassPage = () => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError(''); // Reset error when user types
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username) {
            setUsernameError('Username is required');
            return;
        }

        // Check for valid email format using a regular expression
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
        if (!isValidEmail) {
            setUsernameError('Invalid email format');
            return;
        }

        // If valid username, proceed with password reset logic
        console.log('Reset password request for username:', username);
        // Add your logic to handle the reset password request here
        navigate('/ResetPass');
    };
  
    return (
        <div>
          {/* IKUSSASATECH Banner */}
          <div className="ikussasatech-banner">IKUSSASATECH</div>
  
          {/* Reset Password Heading */}
          <h2 className="reset-password-heading">Reset Password</h2>
          
          {/* Container for Forgot Password */}
          <div className="forgot-password-container">
            {/* Gray container with username form */}
            <div className="form-container">
              <div className="subheading">Forgot Password</div>
              {usernameError && <div className="error-message">{usernameError}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="username-input"
                    required
                  />
                </div>
                <button type="submit" className="reset-password-button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      );
  };

export default ForgotPassPage;
