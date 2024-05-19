import React, { useState } from 'react';
import './components/ResetPass.css'; // Import CSS for styling

const ResetPass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters with letters and numbers
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      if (!validatePassword(password)) {
      alert('Password must be at least 8 characters and include both letters and numbers.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Password reset successful:', password);
    // Add your logic to handle password reset (e.g., send request to update password)
  };

  return (
    <div className="reset-password-page">
      {/* IKUSASATECH subheading */}
      <div className="ikusasatech-header">IKUSASATECH</div>
      
      {/* Reset Password heading */}
      <h2 className="reset-password-heading">Reset Password</h2>

      {/* Gray container with password form */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="password-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="password-input"
              required
            />
          </div>
          <button type="submit" className="reset-password-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
