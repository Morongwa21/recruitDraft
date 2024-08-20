import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './company logo.jpg';
import { FaUser } from 'react-icons/fa';

const ScheduleInterview = () => {
    const { candidateId } = useParams(); 
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const handleChangePassword = () => {
        navigate('/changepassword');
    };
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
console.log('id', candidateId)
console.log('Form data', formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://recruitment-portal-l0n5.onrender.com/applications/${candidateId}`, formData);
            alert('Interview scheduled successfully!');
        } catch (error) {
            console.error('Error scheduling interview:', error);
            alert('Failed to schedule interview. Please try again.');
        }
    };
    const africanTimeZones = [
        'Africa/Abidjan',
        'Africa/Accra',
        'Africa/Addis_Ababa',
        'Africa/Algiers',
        'Africa/Asmara',
        'Africa/Bamako',
        'Africa/Bangui',
        'Africa/Banjul',
        'Africa/Bissau',
        'Africa/Blantyre',
        'Africa/Brazzaville',
        'Africa/Bujumbura',
        'Africa/Cairo',
        'Africa/Casablanca',
        'Africa/Ceuta',
        'Africa/Conakry',
        'Africa/Dakar',
        'Africa/Dar_es_Salaam',
        'Africa/Djibouti',
        'Africa/Douala',
        'Africa/El_Aaiun',
        'Africa/Freetown',
        'Africa/Gaborone',
        'Africa/Harare',
        'Africa/Johannesburg',
        'Africa/Juba',
        'Africa/Kampala',
        'Africa/Khartoum',
        'Africa/Kigali',
        'Africa/Kinshasa',
        'Africa/Lagos',
        'Africa/Libreville',
        'Africa/Lome',
        'Africa/Luanda',
        'Africa/Lubumbashi',
        'Africa/Lusaka',
        'Africa/Malabo',
        'Africa/Maputo',
        'Africa/Maseru',
        'Africa/Mbabane',
        'Africa/Mogadishu',
        'Africa/Monrovia',
        'Africa/Nairobi',
        'Africa/Ndjamena',
        'Africa/Niamey',
        'Africa/Nouakchott',
        'Africa/Ouagadougou',
        'Africa/Porto-Novo',
        'Africa/Sao_Tome',
        'Africa/Tripoli',
        'Africa/Tunis',
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
                <label>Start Time:</label>
                <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
            </div>
            <div>
                <label>End Time:</label>
                <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
            </div>
            <div>
                <label>Venue:</label>
                <input type="text" name="venue" value={formData.venue} onChange={handleChange} required />
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
                        <label>Timezone:</label>
                        <select name="timezone" value={formData.timezone} onChange={handleChange} required>
                            <option value="">Select Timezone</option>
                            {africanTimeZones.map((tz) => (
                                <option key={tz} value={tz}>
                                    {tz}
                                </option>
                            ))}
                        </select>
                    </div>
            <div>
                <label>Duration:</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} required />
            </div>
            <button type="submit" className="schedule-button">Schedule Interview</button>
            </form>
        </div>
        </div>

    );
};

export default ScheduleInterview;
