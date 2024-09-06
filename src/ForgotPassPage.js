import React, { useState } from 'react';
import './components/LoginA.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import logo from './company logo.jpg';

const ForgotPassPage = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
          setEmailError('Email is required');
            return;
        }

        // Check for valid email format using a regular expression
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            setEmailError('Invalid email format');
            return;
        }

        try {
            // Make a POST request to the specified endpoint
            const response = await axios.post('https://recruitment-portal-utcp.onrender.com/forgot-password', {
                email: email
            });

            if (response.status === 200) {
                console.log('Password reset request successful:', response.data);
                // Add any logic for handling successful password reset request here
                navigate('/reset-password'); // Navigate to ResetPassPage after successful submission
            } else {
                alert('Password reset request failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during password reset request:', error.message);
            alert('An error occurred during password reset request. Please try again later.');
        }
    };
  
    return (
        <div className="login-page">
            <div className="login-logo">
                <img src={logo} alt="Company Logo" />
            </div>
            <div className="gradient-lines">
                <div className="gradient-line"></div>
                <div className="gradient-line"></div>
            </div>
            <div className="login-heading">
                <h2>Reset Password</h2>
            </div>
            <form className="login-container" onSubmit={handleSubmit}>
                <label htmlFor="email">E-Mail Address</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="Login-input-field"
                    required
                />
                {emailError && <div className="error-message">{emailError}</div>}
                <button type="submit" className="login-button">Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassPage;