import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './components/Notifications.css'; // Add your styles here

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/notifications');//To get the endpoint from Tiyani
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error.message);
        }
    };

    return (
        <div className="notifications-page">
            <h2>Notifications</h2>
            <ul className="notifications-list">
                {notifications.map((notification, index) => (
                    <li key={index} className="notification-item">
                        <span>{notification.message}</span>
                        <span className="notification-time">{new Date(notification.createdAt).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
