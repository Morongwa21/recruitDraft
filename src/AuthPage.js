import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './components/AuthPage.css'; // Import CSS file for AuthPage styles
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {
    const [otpCode, setOtpCode] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
    const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages
    const navigate = useNavigate();



    const location = useLocation();
    const email = location.state?.email || '';

    useEffect(() => {
        let timeout;
        if (showPopup) {
            timeout = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [showPopup]); // Run this effect when showPopup changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        /////
        console.log('OTP:', otpCode);
        try {
            const response = await axios.post('https://recruitment-portal-l0n5.onrender.com/verify-otp', { otpCode });
            
           

                navigate('/LoginPage');
                console.log('Server Response:', response.data); // Log server response


           
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with an error status:', error.response.status);
                console.error('Error message from server:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from server:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error setting up the request:', error.message);
            }
            setErrorMessage('Error verifying OTP. Please try again.');
        }
    }
    return (
        <div className="auth-container">
        {/* IKUSASATECH text */}
        <div className="brand-text">IKUSASATECH</div>

        {/* Heading */}
        <div className="heading">
            <h2>Account Verification</h2>
        </div>

        {/* Main Content */}
        <div className="main-content">
            {/* Display email and trigger OTP entry */}
            <form onSubmit={handleSubmit} className="otp-form">
                <div className="otp-input-wrapper">
                    <label htmlFor="otpInput" className="otp-label">OTP Code:</label>
                    <input
                        id="otpInput"
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter OTP"
                        required
                    />
                </div>
                <button type="submit">Verify</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>

        {/* Overlay Popup for OTP */}
        {showPopup && (
            <div className="overlay-popup">
                <div className="popup-content">
                    <p className="popup-email-info">OTP has been sent to {email}</p>
                </div>
            </div>
        )}
    </div>
);
};

export default AuthPage;
