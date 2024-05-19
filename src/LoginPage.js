import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/LoginPage.css';
import axios from 'axios'; // Import Axios for making HTTP requests

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpClick = () => {
    // Navigate to SignUpPage when Sign Up button is clicked
    navigate('/signup');
  };

  const handleForgotPasswordClick = () => {
    // Navigate to ForgotPasswordPage when "Forgot password?" link is clicked
    navigate('/forgotpassword');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if username and password are provided
    if (!email || !password) {
      alert('Please enter your username and password.');
      return;
    }

    try {
      // Make a POST request to the login endpoint with username and password
      const response = await axios.post('https://recruitment-portal-l0n5.onrender.com/login', {
        email: email,
        password: password
      });

      // If login is successful (status code 200), navigate to the desired page
      if (response.status === 200) {
        navigate('/ProRecr');
      } else {
        // If login fails, display an error message
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      // If an error occurs during the request, display an error message
      console.error('Error during login:', error.message);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login-page-container">
      {/* IKUSASATECH text */}
      <div className="brand-text">IKUSASATECH</div>

      <div className="login-form-container">
        <h2 className="login-heading">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email or phone number"
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="forgot-password">
          {/* Use onClick to trigger handleForgotPasswordClick */}
          <span className="forgot-password-link" onClick={handleForgotPasswordClick}>
            Forgot password?
          </span>
        </div>
      </div>

      {/* Vertical line with break and "OR" text */}
      <div className="separator">
        <div className="line"></div>
        <div className="or-text">OR</div>
        <div className="line"></div>
      </div>

      {/* Sign Up button */}
      <div className="sign-up-container">
        <button className="sign-up-button" onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
