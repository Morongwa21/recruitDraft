import React, { useState } from 'react';
import './components/LoginA.css';
import logo from './company logo.jpg';

const ResetPass = () => {

  console.log("reset")
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  console.log("my token " + token);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
   

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }


    // Create a form element to submit as POST
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://recruitment-portal-rl5g.onrender.com/forgot-password'; // Adjust to the correct URL

    // Create hidden input elements for password, passwordConfirm, and token
    const passwordInput = document.createElement('input');
    passwordInput.type = 'hidden';
    passwordInput.name = 'password';
    passwordInput.value = password;

    const passwordConfirmInput = document.createElement('input');
    passwordConfirmInput.type = 'hidden';
    passwordConfirmInput.name = 'passwordConfirm';
    passwordConfirmInput.value = confirmPassword;

    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token';
    tokenInput.value = token;

    form.appendChild(passwordInput);
    form.appendChild(passwordConfirmInput);
    form.appendChild(tokenInput);

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="login-page">
         <header className="login-header">
          <div className="logo">
            <img src={logo} alt="Company logo" />
          </div>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="/UserViewPost">Job Listings</a></li>
            </ul>
          </nav>
        </header>
        
      <h2 className="login-heading">Reset Password</h2>

      <form className="login-container" onSubmit={handleSubmit}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="Login-input-field"
                required
              />
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="Login-input-field"
                required
              />
            <button type="submit" className="login-button">Reset Password</button>
          </form>
        </div>
    
  );
};

export default ResetPass;