import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unviewedCount, setUnviewedCount] = useState(0);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('https://recruitment-portal-utcp.onrender.com/notifications');
                setNotifications(response.data);
                console.log('Notifications:', response.data);

                const unviewed = response.data.filter(notification => !notification.isRead);
                setUnviewedCount(unviewed.length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const fetchNotificationById = async (notificationId) => {
        if (!notificationId) {
            console.error('Notification ID is required');
            return;
        }
        try {
            console.log('Fetching notification with ID:', notificationId);
            const response = await axios.get(`https://recruitment-portal-utcp.onrender.com/notifications/${notificationId}`);
            console.log('Notification Details:', response.data);

            setSelectedNotification(response.data);
        } catch (error) {
            console.error('Error fetching notification by ID:', error);
        }
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unviewedCount,
            isNotificationsOpen,
            setIsNotificationsOpen,
            fetchNotificationById,
            selectedNotification,
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
