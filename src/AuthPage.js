import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './components/LoginA.css';
import logo from './company logo.jpg';

axios.defaults.withCredentials = true;

Modal.setAppElement('#root');

function AuthPage() {
  const [otp, setOtp] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

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
  }, [showPopup]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://recruitment-portal-l0n5.onrender.com/verify-otp',
        { otp }
      );
      setLoading(false);
      if (response.status === 200) {
        console.log(response.data);
        setShowPopup(true);
        setModalIsOpen(true);
      } else {
        setError('OTP verification failed. Please check your OTP.');
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error('Error response:', error.response);
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        console.error('Error:', error.message);
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');
    try {
      const response = await axios.post('https://recruitment-portal-l0n5.onrender.com/resend-otp', {});
      setResendLoading(false);
      if (response.status === 200) {
        console.log(response.data);
        setShowPopup(true);
      } else {
        setError('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      setResendLoading(false);
      if (error.response) {
        console.error('Error response:', error.response);
        const errorMessage = error.response.data.message;
        if (errorMessage === "User already verified, please login") {
          setErrorModalIsOpen(true);
        } else {
          setError(errorMessage || 'An error occurred. Please try again.');
        }
      } else {
        console.error('Error:', error.message);
        setError('An error occurred. Please try again.');
      }
    }
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const goToCompleteProfile = () => {
    setModalIsOpen(false);
    navigate('/LoginA');
  };

  const goToJobSearch = () => {
    setModalIsOpen(false);
    navigate('/UserViewPost');
  };

  const closeErrorModal = () => {
    setErrorModalIsOpen(false);
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
      <div className="login-heading">
        <h2>Account Verification</h2>
      </div>

      <form className="login-container" onSubmit={handleSubmit}>
        <div className="otp-input-wrapper">
          <label htmlFor="otpInput">OTP Code:</label>
          <input
            id="otpInput"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="Login-input-field"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        {error && <p className="error-message">{error}</p>}
        <button onClick={handleResendOTP} disabled={resendLoading} className="login-button">
        {resendLoading ? 'Resending...' : 'Resend OTP'}
      </button>
      </form>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
     
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Welcome Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Welcome!</h2>
        <p>We have created your account. Complete your profile for personalized search results.</p>
        <button onClick={goToCompleteProfile} className="auth-modal-button">Complete Profile</button>
        <button onClick={goToJobSearch} className="auth-modal-button">Job Search</button>
      </Modal>
      <Modal
        isOpen={errorModalIsOpen}
        onRequestClose={closeErrorModal}
        contentLabel="Error Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Error</h2>
        <p>User already verified, please login.</p>
        <button onClick={closeErrorModal} className="auth-modal-button">Close</button>
      </Modal>
    </div>
  );
}

export default AuthPage;
