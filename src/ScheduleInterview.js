import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './company logo.jpg';
import { FaUser } from 'react-icons/fa';

const ScheduleInterview = () => {
    const { appId } = useParams(); 
    const [dropdownVisible, setDropdownVisible] = useState(false);
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
            const response = await axios.post(`https://recruitment-portal-t6a3.onrender.com/applications/${appId}`, formData, {
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
                <div className="user-info" onClick={handleUserInfoClick}>
                    <FaUser className="user-icon" />
                </div>
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
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
