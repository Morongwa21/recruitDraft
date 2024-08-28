import React, { useState, useEffect } from 'react';
import logo from './company logo.jpg'; // Make sure to provide the correct path for your logo image
import './components/AdminDash.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { FaEdit, FaUserCircle, FaTrash, FaPlus, FaCity, FaEnvelope, FaPhone, FaUser, FaBell, FaBook, FaGraduationCap, FaCalendarAlt,FaBuilding, FaBriefcase, FaClock, FaTasks, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ViewAJobs = () => {
    const [username, setUsername] = useState('');
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unviewedCount, setUnviewedCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
        fetchUserApplications();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');
            console.log('Fetching details for user ID:', userId);
            const response = await axios.get(`https://recruitment-portal-t6a3.onrender.com/user/${userId}`);
  
            if (response.status === 200) {
                const userData = response.data;
                console.log('User data:', userData);
                setUsername(userData.username);
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    const fetchUserApplications = async () => {
        try {
            const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/applications/me');
  
            if (response.status === 200) {
                const applicationData = response.data;
                console.log('User applications:', applicationData);
                setApplications(applicationData);
                fetchJobDetails(applicationData);
            } else {
                console.error('Failed to fetch user applications');
            }
        } catch (error) {
            console.error('Error fetching user applications:', error.message);
        }
    };

    const fetchJobDetails = async (applications) => {
        try {
            const jobIds = applications.map(application => application.jobId);
            const jobDetailsPromises = jobIds.map(jobId =>
                axios.get(`https://recruitment-portal-t6a3.onrender.com/jobs/${jobId}`)
            );
            const jobDetailsResponses = await Promise.all(jobDetailsPromises);
            const jobDetails = jobDetailsResponses.map(response => response.data);
            console.log('job details', jobDetails); // Check if job details are correctly extracted
            setJobs(jobDetails);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching job details:', error.message);
            setLoading(false);
        }
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/LoginPageA');
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
    const handleDeleteApplication = async (appId) => {
        const deleteUrl = `https://recruitment-portal-t6a3.onrender.com/applications/${appId}/withdraw`;
        console.log('Delete URL:', deleteUrl);  // Log the URL
        try {
            const response = await axios.delete(deleteUrl);
            if (response.status === 200) {
                alert('Application withdrawn successfully.');
                // Refresh the applications list after deletion
                fetchUserApplications();
            }
        } catch (error) {
            console.error('Error deleting application:', error.message);
            alert('Failed to delete the application.');
        }
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
            <div className="admin-content">
                <aside className="side">
                    <ul>
                        <li><a href="/OneProfile">Profile</a></li>
                        <li><a href="/IkusasaProgram">Job Listings</a></li> 
                        <li><a href="/ViewAJobs">Job Applications</a></li>
                        <li><a href="/CVTemplate">Templates</a></li>
                    </ul>
                </aside>
                <div className="main-content">
                    <div className="applications">
                        <h2>Your Job Applications</h2>
                        {loading ? (  // Show the spinner while loading
                            <div className="spinner-cont">
                                <FaSpinner className="spinner-icons" />
                                <p>Loading your applications...</p>
                            </div>
                        ) : applications.length > 0 ? (
                            jobs.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Job Title</th>
                                            <th>Company</th>
                                            <th>Status</th>
                                            <th>View</th>
                                            <th>Withdraw</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map(application => {
                                            const job = jobs.find(job => job._id === application.jobId);
                                            if (!job) {
                                                return (
                                                    <tr key={application._id}>
                                                        <td colSpan="5">Job details not found</td>
                                                    </tr>
                                                );
                                            }
                                            return (
                                                <tr key={application._id}>
                                                    <td>{job.title}</td>
                                                    <td>{job.company}</td>
                                                    <td>{application.status}</td>
                                                    <td>
                                                        <Link to={`/UserApply/${job._id}`}>View Job</Link>
                                                    </td>
                                                    <td>
                                                        <button className="delete-button" onClick={() => handleDeleteApplication(application._id)}>
                                                            <FaTimesCircle />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Loading job details...</p>
                            )
                        ) : (
                            <p>No applications found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAJobs;
