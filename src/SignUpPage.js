import React, { useState } from 'react';
import './components/LoginA.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './company logo.jpg';

const SignUpPage = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const [showOTPModal, setShowOTPModal] = useState(false); 
    const [showUserExistsMessage, setShowUserExistsMessage] = useState(false); // State for showing user exists message

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('jobseeker');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleTermsChange = () => {
        setAcceptedTerms(!acceptedTerms);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!acceptedTerms) {
            alert('Please accept the terms and conditions.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please re-enter your passwords.');
            return;
        }

        const formData = {
            username,
            email,
            password,
            accountType,
        };

        try {
            const response = await axios.post('https://recruitment-portal-l0n5.onrender.com/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Form submitted successfully!');
            setShowOTPModal(true);

        } catch (error) {
            if (error.response) {
                setServerError(error.response.data.message);
                console.error('Server error:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Request error:', error.message);
            }
        }
    };
    const LoginClick = () => {
        navigate('/LoginPageA');
      };
   const handleModalClose = () => {
        setShowOTPModal(false);
        navigate('/AuthPage'); 
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
            <div className="signup-heading">
                <h2>Create Account</h2>
            </div>
            <form className="login-container" onSubmit={handleSubmit}>
                <label htmlFor="accountType">Account Type:</label>
                <select
                    id="accountType"
                    name="accountType"
                    className="Login-input-field"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    required
                >
                    <option value="jobseeker">Jobseeker</option>
                    <option value="recruiter">Recruiter</option>
                </select>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter Username"
                    className="Login-input-field"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    className="Login-input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    className="Login-input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="Login-input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <label htmlFor="terms">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={acceptedTerms}
                        onChange={handleTermsChange}
                        required
                    />
                    &nbsp;I accept the <span className="terms-link">Terms and Conditions</span>
                </label>
                <button type="submit" className="login-button">
          Register
        </button>
        <div className="separator">
          <div className="line"></div>
          <div className="or-text">OR</div>
          <div className="line"></div>
        </div>
        <button type="button" className="signup-button" onClick={LoginClick}>Login</button>
                {serverError && <div className="error-message">{serverError}</div>}
                {showUserExistsMessage && (
                    <div className="error-message">
                        A user with this email or username already exists. Please log in or use a different email/username.
                    </div>
                )}
            </form>
            {showOTPModal && (
                <div className="otp-modal">
                    <div className="otp-modal-content">
                        <h3>OTP Token Sent</h3>
                        <p>An OTP token has been sent to your email. Please check your inbox.</p>
                        <button onClick={handleModalClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default SignUpPage;