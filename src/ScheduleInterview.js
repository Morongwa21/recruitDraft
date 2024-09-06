import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './company logo.jpg';
import { FaUser, FaBell } from 'react-icons/fa';

const ScheduleInterview = () => {
    const { appId } = useParams(); 
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unviewedCount, setUnviewedCount] = useState(0);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        startTime: '',
        endTime: '',
        venue: '',
        instructions: '',
        reminderMinutes: '',
        timezone: '',
        duration: ''
    });
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/LoginPage');
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://recruitment-portal-utcp.onrender.com/applications/${appId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you use JWT
                }
            });
            if (response.status === 200) {
                alert('Interview scheduled successfully!');
                navigate('/AdminViewCandidates');            }
        } catch (error) {
            console.error('Error scheduling interview:', error);
            alert('Failed to schedule interview. Please try again.');
        }
    };
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('https://recruitment-portal-utcp.onrender.com/notifications');
                setNotifications(response.data);
      
                // Count unviewed notifications
                const unviewed = response.data.filter(notification => !notification.viewed);
                setUnviewedCount(unviewed.length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
      
        fetchNotifications();
      }, []);
      const handleBellClick = (event) => {
        event.stopPropagation();  // Prevent click from triggering other click handlers
        setIsNotificationsOpen(!isNotificationsOpen);
      };
      
      
      // Handle page click to close both dropdowns
      const handlePageClick = () => {
          setIsNotificationsOpen(false);
          setDropdownVisible(false);
      };
    const africanTimeZones = [
        'Africa/Johannesburg',
        'Africa/Accra',
        'Africa/Addis_Ababa',
        'Africa/Windhoek'
    ];

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
            <div className="main-content">
                <h2 className="schedule-heading">Schedule Interview</h2>
                <form onSubmit={handleSubmit}>
                <div>
                        <label>Timezone:</label>
                        <select name="timezone" value={formData.timezone} onChange={handleChange} required>
                            <option value="">Select Timezone</option>
                            {africanTimeZones.map((tz) => (
                                <option key={tz} value={tz}>{tz}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Start Time:</label>
                        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>End Time:</label>
                        <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
                    </div>
                    
                    <div>
                        <label>Instructions:</label>
                        <textarea name="instructions" value={formData.instructions} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Reminder Minutes:</label>
                        <input type="number" name="reminderMinutes" value={formData.reminderMinutes} onChange={handleChange} required />
                    </div>
                   
                    <div>
                        <label>Duration:</label>
                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Venue:</label>
                        <input type="text" name="venue" value={formData.venue} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="schedule-button">Schedule Interview</button>
                </form>
            </div>
        </div>
    );
};

export default ScheduleInterview;
