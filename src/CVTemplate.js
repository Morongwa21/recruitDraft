import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaUser, FaArrowLeft, FaBell } from 'react-icons/fa';
import logo from './company logo.jpg';
import BasicTemp from './BasicTemp';
import { ClipLoader } from 'react-spinners'; 
import ElegantTemp from './ElegantTemp';
import TemplateSelector from './TemplateSelector';

const CVTemplate = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Basic');
  const [loading, setLoading] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unviewedCount, setUnviewedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://recruitment-portal-t6a3.onrender.com/profile`);
        setProfile(response.data.profile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false); // Stop the spinner after data is fetched
      }
    };

    fetchProfile();
  }, [userId]);

 
  const handleUserInfoClick = (e) => {
    e.stopPropagation();  // Prevent the global click handler from running
    setDropdownVisible(!dropdownVisible);
};
  const handleChangeTemplate = (template) => {
    setSelectedTemplate(template);
  };
  useEffect(() => {
    const fetchNotifications = async () => {
        try {
            const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/notifications');
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
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/LoginPageA');
  };
  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case 'Elegant':
        return ElegantTemp;
      case 'Basic':
      default:
        return BasicTemp;
    }
  };

  const TemplateComponent = getTemplateComponent();

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

      <div className="cv-content">
        <button className="cvb-button" onClick={handleBack}>
          <FaArrowLeft className="back-icon" /> Back
        </button>
        <TemplateSelector currentTemplate={selectedTemplate} onChangeTemplate={handleChangeTemplate} />

        {loading ? (
          <div className="spinner-container">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
            <p>Loading profile data...</p>
          </div>
        ) : (
          <>
            <h1>{profile.firstName} {profile.lastName}'s CV</h1>
            <PDFDownloadLink
              document={<TemplateComponent profile={profile} />}
              fileName={`${profile.firstName}-${profile.lastName}-CV.pdf`}
            >
              {({ loading }) => (
                <button className="download-button">
                  {loading ? 'Generating PDF...' : 'Download CV'}
                </button>
              )}
            </PDFDownloadLink>
          </>
        )}
      </div>
    </div>
  );
};

export default CVTemplate;
