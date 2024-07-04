import React, { useState, useEffect } from 'react';
import logo from './company logo.jpg'; // Make sure to provide the correct path for your logo image
import './components/AdminDash.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
const ViewAJobs = () => {
    const [username, setUsername] = useState('');
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
        fetchUserApplications();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');
            console.log('Fetching details for user ID:', userId);
            const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
  
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
            const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/applications/me');
  
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
                axios.get(`https://recruitment-portal-l0n5.onrender.com/jobs/${jobId}`)
            );
            const jobDetailsResponses = await Promise.all(jobDetailsPromises);
            const jobDetails = jobDetailsResponses.map(response => response.data);
            console.log('job details', jobDetails); // Check if job details are correctly extracted
            setJobs(jobDetails);
        } catch (error) {
            console.error('Error fetching job details:', error.message);
        }
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        // Handle logout logic here
    };
    const handleDeleteApplication = async (appId) => {
        const deleteUrl = `https://recruitment-portal-l0n5.onrender.com/applications/${appId}/withdraw`;
        console.log('Delete URL:', deleteUrl);  // Log the URL
        try {
            const response = await axios.delete(deleteUrl);
            if (response.status === 200) {
                alert('Application deleted successfully.');
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
                <div className="user-info" onClick={handleUserInfoClick}>
                    Welcome, {username}
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>  
            </header>
            <div className="admin-content">
                <aside className="side">
                    <ul>
                          {/* <li><a href="#home">Home</a></li> */}
            <li><a href="/ProfileUsers">Profile</a></li>
            <li><a href="/ViewPosts">Documents</a></li>
            <li><a href="/IkusasaProgram">Job Listings</a></li> 
            <li><a href="/ViewAJobs">Job Applications</a></li>
            <li><a href="/ApplicationTemplates">Templates</a></li>
                    </ul>
                </aside>
                <div className="main-content">
                    <div className="button-container">
                        <button className="red-button" onClick={() => navigate('/ProfileEdit')}>Personal Info</button>
                        <button className="red-button" onClick={() => navigate('/EducationPage')}>Education</button>
                        <button className="red-button" onClick={() => navigate('/WorkExperience')}>Work Experience</button>
                    </div>
                    <div className="applications">
                        <h2>Your Job Applications</h2>
                        {jobs.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th>Company</th>
                                        <th>Status</th>
                                        <th>View</th>
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map(application => {
                                        const job = jobs.find(job => job._id === application.jobId);
                                        if (!job) {
                                            return (
                                                <tr key={application._id}>
                                                    <td colSpan="4">Job details not found</td>
                                                </tr>
                                            );
                                        }
                                        return (
                                            <tr key={application._id}>
                                                <td>{job.title}</td>
                                                <td>{job.company}</td>
                                                <td>{application.status}</td>
                                                <td>
                                                    <Link to={`/JobDetails/${job._id}`}>View Job</Link>
                                                </td>
                                                <td> <button className="delete-button" onClick={() => handleDeleteApplication(application._id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <p>Loading job details...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAJobs;
