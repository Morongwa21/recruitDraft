import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import logo from './company logo.jpg';

import './components/SupportPage.css'; 
import {FaUser, FaBell, FaHeadset } from 'react-icons/fa';
import NotificationContext from './NotificationContext';
import { useNavigate } from 'react-router-dom';

const SupportPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('general_query');
    const [resolution, setResolution] = useState('');
    const [screenshot, setScreenshot] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {
        notifications,
        unviewedCount,
        isNotificationsOpen,
        setIsNotificationsOpen,
        fetchNotificationById,
        selectedNotification,
    } = useContext(NotificationContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
          case 'name':
            setName(value);
            break;
          case 'email':
            setEmail(value);
            break;
          case 'subject':
            setSubject(value);
            break;
          case 'description':
            setDescription(value);
            break;
          case 'type':
            setType(value);
            break;
          case 'resolution':
            setResolution(value);
            break;
          default:
            break;
        }
      };
      
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setScreenshot(file ? URL.createObjectURL(file) : '');
      };
      
    const handleUserInfoClick = (e) => {
        e.stopPropagation();  
        setDropdownVisible(!dropdownVisible);
    };      
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleChangePassword = () => {
        navigate('/changepassword');
    };
    const handlePageClick = () => {
        setIsNotificationsOpen(false);
        setDropdownVisible(false);
    };
    const handleNotificationClick = async (notificationId) => {
        console.log('Notification ID clicked:', notificationId);  // Log the ID of the notification clicked
      
        try {
            const notification = await fetchNotificationById(notificationId); // Fetch the notification details
            console.log('Fetched notification:', notification);  // Log the notification details
      
            setIsNotificationsOpen(true);
            navigate(`/notification/${notificationId}`);
        } catch (error) {
            console.error('Error fetching notification:', error);
        }
      };
      const handleBellClick = (event) => {
        event.stopPropagation();
        setIsNotificationsOpen(!isNotificationsOpen);
      };
      const logFormData = (formData) => {
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('https://recruitment-portal-utcp.onrender.com/ticket/', {
            name,
            email,
            subject,
            description,
            type,
            resolution,
            screenshot
          });
      
          console.log('Response:', response); // Log the response
          if (response.status === 201) {
            setSuccess('Ticket submitted successfully!');
            setError('');
            setShowSuccessPopup(true);
          }
        } catch (err) {
          console.error('Error:', err); // Log the error
          setError('Error submitting ticket.');
          setSuccessMessage('');        }
      };
      
    
      const handlePopupClose = () => {
        setShowSuccessPopup(false);
    };
    return (
        <div className="admin-page">
        <header className="admin-header">
    <div className="logo">
      <img src={logo} alt="Company Logo" />
    </div>
    <div className="user-info">
                <FaBell className="bell-icon" onClick={handleBellClick} /> 
                {unviewedCount > 0 && (
                    <span className="notification-count">{unviewedCount}</span>
                )}

{isNotificationsOpen && (
    <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
        <h3>Notifications</h3>
        <ul>
            {notifications.map(notification => (
                <li key={notification.id}>
                    <div className="notification-message">
                        {notification.message}
                        {!notification.viewed && <strong> (New)</strong>}
                    </div>
                    <div className="notification-date">
                        {new Date(notification.receivedAt).toLocaleDateString()}
                    </div>
                </li>
            ))}
        </ul>
    </div>
                )}
                <FaUser className="user-icon" onClick={handleUserInfoClick} />
                {dropdownVisible && (
                    <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </header>
        <div className="support-page">
            <h2>Contact Support</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="support-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
                </div>
             
              
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="general_query">general_query</option>
                        <option value="feature_request">feature_request</option>
                        <option value="bug_report">bug_report</option>
                        <option value="system_issue">system_issue</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="screenshot">Screenshot (optional)</label>
                    <input
                        type="file"
                        id="screenshot"
                        name="screenshot"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="submit-button">Submit Ticket</button>
            </form>
        </div>
        {showSuccessPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>{successMessage}The Ticket has been Created, Our support will be in contact with you shortly.</h3>
                        <button onClick={handlePopupClose}>Close</button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default SupportPage;