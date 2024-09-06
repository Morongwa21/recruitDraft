import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NotificationContext from './NotificationContext';
import logo from './company logo.jpg';
import {FaTrash } from 'react-icons/fa';
import axios from 'axios';

const NotificationDetail = () => {
    const {
        notifications,
        unviewedCount,
        isNotificationsOpen,
        setIsNotificationsOpen,
        fetchNotificationById,
        selectedNotification,
    } = useContext(NotificationContext);
    const { notificationId } = useParams();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (notificationId) {
            fetchNotificationById(notificationId);
        }
    }, [notificationId, fetchNotificationById]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/LoginPageA');
    };

    const handleUserInfoClick = (e) => {
        e.stopPropagation();
        setDropdownVisible(!dropdownVisible);
    };

    const handleBellClick = (event) => {
        event.stopPropagation();
        setIsNotificationsOpen(!isNotificationsOpen);
    };

    const handlePageClick = () => {
        setIsNotificationsOpen(false);
        setDropdownVisible(false);
    };

    const handleNotificationClick = (notificationId) => {
        fetchNotificationById(notificationId);
        setIsNotificationsOpen(true);
        navigate(`/notification/${notificationId}`);
    };

    const handleBackClick = () => {
        navigate(-1); // Navigates to the previous page
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`https://recruitment-portal-utcp.onrender.com/notifications/${notificationId}`);
            navigate('/notifications'); 
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    if (!notificationId) return <p className="loading-message">No notification ID provided.</p>;
    return (
        <div className="admin-page" onClick={handlePageClick}>
            <header className="admin-header">
                <div className="logo">
                    <img src={logo} alt="Company Logo" />
                </div>
               
            </header>
            <div className="notification-detail-container">
                {selectedNotification ? (
                    <div>
                        <div className="notification-header">
                            <h2 className="notification-title">Notification Details</h2>
                        </div>
                        <p className="notification-message">
                            <strong>Title:</strong> {selectedNotification.title}
                        </p>
                        <p className="notification-message">
                            <strong>Message:</strong> {selectedNotification.message}
                        </p>
                        <p className="notification-date">
                            <strong>Date:</strong> {new Date(selectedNotification.timestamp).toLocaleString()}
                        </p>
                        <div className="notification-actions">
                            <button onClick={handleBackClick} className="back-button">Back To profile</button>
                            {/* <button onClick={handleDeleteClick} className="notydelete-button">
                                <FaTrash /> 
                            </button> */}
                        </div>
                    </div>
                ) : (
                    <p className="loading-message">Loading notification details...</p>
                )}
            </div>
        </div>
    );
};

export default NotificationDetail;
