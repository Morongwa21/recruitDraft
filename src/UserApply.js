import React, { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './components/ViewJobDetails.css';
import logo from './company logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faBriefcase, faCalendarAlt, faUsers, faClipboardList, faCheckCircle, faArrowLeft, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import {  FaUser, FaBell, FaBook, FaGraduationCap, FaCalendarAlt, FaBuilding, FaBriefcase, FaClock, FaTasks, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import NotificationContext from './NotificationContext';


const UserApply = () => {
    const {
        notifications,
        unviewedCount,
        isNotificationsOpen,
        setIsNotificationsOpen,
        fetchNotificationById,
        selectedNotification,
    } = useContext(NotificationContext);
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const jobResponse = await axios.get(`https://recruitment-portal-utcp.onrender.com/jobs/${id}`);
                const jobData = jobResponse.data;
                setJob(jobData);
                localStorage.setItem('jobId', jobData._id);

                // Fetch application status
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const applicationResponse = await axios.get(`https://recruitment-portal-utcp.onrender.com/applications/me`);
                    const userApplications = applicationResponse.data;
                    const applied = userApplications.some(application => application.jobId === jobData._id);
                    setHasApplied(applied);
                }
            } catch (error) {
                setError('Error fetching job details');
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);
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
    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleApply = () => {
        navigate('/JobApplicationPage');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/LoginPage');
    };
 
      const handleBellClick = (event) => {
        event.stopPropagation();
        setIsNotificationsOpen(!isNotificationsOpen);
      };
      
      
      // Handle page click to close both dropdowns
      const handlePageClick = () => {
          setIsNotificationsOpen(false);
          setDropdownVisible(false);
      };
    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    if (loading) {
        return (
            <div className="spinner-cont">
                <FaSpinner className="spinner-icons" spin />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!job) {
        return <div>No job details available</div>;
    }

    const {
        company,
        title,
        location,
        employmentType,
        closingDate,
        salary,
        skills = [],
        workExperience,
        updatedAt,

        createdAt,
        numApplications,
        jobSummary,
        responsibilities = [],
        requirements = [],
    } = job;

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
                                <li 
                                    key={notification._id}
                                    onClick={() => handleNotificationClick(notification._id)}
                                >
                                    <div className="notification-message">
                                        {notification.message}
                                        {!notification.isRead && <strong> (New)</strong>}
                                    </div>
                                    <div className="notification-date">
                                    {new Date(notification.createdAt).toLocaleDateString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {selectedNotification && (
                            <div className="notification-detail">
                                <h4>{selectedNotification.title}</h4>
                                <p>{selectedNotification.message}</p>
                                <span>                       
                                   {new Date(selectedNotification.updatedAt).toLocaleString()}
                                </span>
                            </div>
                        )}
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

            <h1 className="job-details-heading">Job Details</h1>

            <div className="user-view-post-container">
                
                <div className="user-view-post-header">
                    <h2><FontAwesomeIcon icon={faBuilding} /> {company}</h2>
                    <h3><FontAwesomeIcon icon={faBriefcase} /> {title}</h3>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {location}</p>
                </div>
                <div className="user-view-post-info">
                    <div>
                        <h4><FontAwesomeIcon icon={faBriefcase} /> Job Type:</h4>
                        <p>{employmentType || 'N/A'}</p>
                    </div>
                    <div>
                        <h4><FontAwesomeIcon icon={faCalendarAlt} /> Date Posted:</h4>
                        <p>{new Date(createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <h4><FontAwesomeIcon icon={faCalendarAlt} /> Closing Date:</h4>
                        <p>{new Date(closingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <h4><FontAwesomeIcon icon={faCalendarAlt} /> Last Updated:</h4>
                        <p>{new Date(updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <h4><FontAwesomeIcon icon={faDollarSign} /> Salary:</h4>
                        <p>{salary || 'N/A'}</p>
                    </div>
                    <div>
                        <h4><FontAwesomeIcon icon={faUsers} /> Number of Applications:</h4>
                        <p>{numApplications || 'N/A'}</p>
                    </div>
                </div>
                <div className="user-view-post-description">
                    <h4><FontAwesomeIcon icon={faClipboardList} /> Job Summary</h4>
                    <p>{jobSummary || 'No summary available.'}</p>
                    {Array.isArray(responsibilities) && responsibilities.length > 0 && (
                        <>
                            <h4><FontAwesomeIcon icon={faCheckCircle} /> Responsibilities</h4>
                            <ul>
                                {responsibilities.map((responsibility, index) => (
                                    <li key={index}>{responsibility}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {Array.isArray(requirements) && requirements.length > 0 && (
                        <>
                            <h4><FontAwesomeIcon icon={faCheckCircle} /> Requirements</h4>
                            <ul>
                                {requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <div className="user-view-post-buttons">
                    <button
                        onClick={handleApply}
                        disabled={hasApplied}
                        style={{
                            backgroundColor: hasApplied ? '#ccc' : '#007bff',
                            color: hasApplied ? '#666' : '#fff',
                            cursor: hasApplied ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {hasApplied ? 'Applied' : 'Apply'}
                    </button>
                    <button className="back-button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserApply;
