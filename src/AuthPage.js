import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './components/LoginA.css';
import logo from './company logo.jpg';

axios.defaults.withCredentials = true;

Modal.setAppElement('#root'); // Set the app root element for accessibility

function AuthPage() {
  const [otp, setOtp] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const goToCompleteProfile = () => {
    setModalIsOpen(false);
    navigate('/LoginPageA');
  };

  const goToJobSearch = () => {
    setModalIsOpen(false);
    navigate('/UserViewPost');
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
      </form>

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
    </div>
  );
}

export default AuthPage;
