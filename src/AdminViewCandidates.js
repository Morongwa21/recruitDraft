import React, { useState, useEffect } from 'react';
import './components/JobPosting.css'; 
import './components/UserViewPosts.css'; 

import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUser, faUsers, faBell, faHome, faSearch, faBriefcase, faEnvelope, faPhone, faBirthdayCake, faGenderless, faFlag, faBuilding, faMapMarkerAlt, faClock, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import logo from './company logo.jpg';

const AdminViewCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [username, setUsername] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [applicationData, setApplicationData] = useState(null);
    const [jobData, setJobData] = useState(null);
    const [profData, setProfData] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [profileData, setProfileData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [resumeUrl, setResumeUrl] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
        fetchCandidates();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`https://recruitment-portal-rl5g.onrender.com/user/${userId}`);
            console.log('User Details Response:', response); // Log the response

            if (response.status === 200) {
                setUsername(response.data.username);
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    const fetchCandidates = async () => {
        try {
            const response = await axios.get('https://recruitment-portal-rl5g.onrender.com/applications');
            console.log('Candidates Response:', response); // Log the response

            setCandidates(response.data);
            // Fetch job details for each candidate's application
            fetchJobDetails(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error.message);
        }
    };

    const fetchJobDetails = async (applications) => {
        try {
            const jobIds = applications.map(application => application.jobId);
            const uniqueJobIds = [...new Set(jobIds)]; // Remove duplicate job IDs
    
            const jobDetailsPromises = uniqueJobIds.map(jobId => {
                return axios.get(`https://recruitment-portal-rl5g.onrender.com/jobs/${jobId}`);
            });
    
            const jobDetailsResponses = await Promise.all(jobDetailsPromises);
            const jobDetails = jobDetailsResponses.map(response => response.data);
    
            // Create a map of jobId to job data
            const jobMap = jobDetails.reduce((acc, job) => {
                acc[job._id] = job;
                return acc;
            }, {});
    
            setJobs(jobMap);
    
            // Fetch profile data for each candidate
            await Promise.all(applications.map(async (application) => {
                const profileResponse = await axios.get(`https://recruitment-portal-rl5g.onrender.com/profile/${application.userId}`);
                
                if (profileResponse.status === 200) {
                    setProfData(profileResponse.data);
                } else {
                    console.error('Failed to fetch profile data');
                }
            }));
        } catch (error) {
            console.error('Error fetching job details:', error.message);
        }
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleChangePassword = () => {
        navigate('/changepassword');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        const filtered = candidates.filter(candidate => {
            const job = jobs.find(job => job._id === candidate.jobId);
            return job && job.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredCandidates(filtered);
    };

    const candidatesToDisplay = filteredCandidates.length > 0 ? filteredCandidates : candidates;
    const handleViewProfile = async (userId, appId, jobId) => {
        try {
            const profileResponse = await axios.get(`https://recruitment-portal-rl5g.onrender.com/profile/${userId}`);
            const applicationResponse = await axios.get(`https://recruitment-portal-rl5g.onrender.com/applications/${appId}`);
            const jobResponse = await axios.get(`https://recruitment-portal-rl5g.onrender.com/jobs/${jobId}`);
            
            if (profileResponse.status === 200 && applicationResponse.status === 200 && jobResponse.status === 200) {
                setProfileData(profileResponse.data);
                setApplicationData(applicationResponse.data);
                setJobData(jobResponse.data);
                setModalVisible(true);
                
                // Update the application status to "View"
                const updateStatusResponse = await axios.put(`https://recruitment-portal-rl5g.onrender.com/applications/${appId}/status`, {
                    status: 'View'
                });
    
                if (updateStatusResponse.status === 200) {
                    console.log('Application status updated to "View"');
                    // Update the local state to reflect the change
                    setCandidates(prevCandidates => prevCandidates.map(candidate => 
                        candidate._id === appId ? { ...candidate, status: 'View' } : candidate
                    ));
                } else {
                    console.error('Failed to update application status');
                }
    
            } else {
                console.error('Failed to fetch profile, application, or job data');
            }
        } catch (error) {
            console.error('Error fetching profile, application, or job data:', error.message);
        }
    };
    
  
        const closeModal = () => {
            setModalVisible(false);
            setProfileData(null);
        };
        const handleActionClick = async (action, candidateId) => {
            if (action === 'Reject') {
                setLoading(true); // Set loading state to true
                try {
                    const response = await axios.patch(`https://recruitment-portal-rl5g.onrender.com/applications/${candidateId}`, {
                        status: 'rejected'
                    });
    
                    if (response.status === 200) {
                        console.log('Application rejected successfully');
                        setCandidates(prevCandidates => prevCandidates.map(candidate =>
                            candidate._id === candidateId ? { ...candidate, status: 'rejected' } : candidate
                        ));
                    } else {
                        console.error('Failed to reject application');
                    }
                } catch (error) {
                    console.error('Error rejecting application:', error.message);
                } finally {
                    setLoading(false); // Set loading state to false after request is complete
                }
            }
            // Handle other actions (Schedule Interview, Offer, Success) if needed
        };
        const handleDownloadResume = async (userId) => {
            try {
                // Construct the URL to download the resume based on the updated route
                const url = `https://recruitment-portal-rl5g.onrender.com/profile/resume/${userId}`;
                // Set the resume URL for downloading
                setResumeUrl(url);
                // Trigger the download
                window.open(url, '_blank');
            } catch (error) {
                console.error('Error downloading resume:', error.message);
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
                            <button onClick={handleChangePassword}>Change Password</button>
                        </div>
                    )}
                </div>
            </header>
            <div className="admin-content">
                <aside className="side">
                    <ul>
                        <li><a href="#dashboard"><FontAwesomeIcon icon={faHome} /> Dashboard</a></li>
                        <li><Link to="/AdminJobPosting"><FontAwesomeIcon icon={faChartBar} /> Job Postings</Link></li>
                        <li><a href="/AdminViewCandidates"><FontAwesomeIcon icon={faUsers} /> Candidates</a></li>
                        {/* <li><a href="#users"><FontAwesomeIcon icon={faUser} /> Users</a></li> */}
                        {/* <li><a href="#analytics"><FontAwesomeIcon icon={faChartBar} /> Analytics</a></li> */}
                         <li><a href="#notifications"><FontAwesomeIcon icon={faBell} /> Notifications</a></li> 
                    </ul>
                </aside>
                <div className="main-content">
                    <h2>Applied Candidates View</h2>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for candidates by Job Title..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button onClick={handleSearchClick}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="candidate-list">
                        <ul>
                            {candidatesToDisplay.map(candidate => {
                                const job = jobs[candidate.jobId]; 
                                return (
                                    <li key={candidate._id}>
                                        <div className="admin-job-container">
                                            <h3><FontAwesomeIcon icon={faUser} /> Full Names: {profData && `${profData.firstName} ${profData.middleName} ${profData.lastName}`}</h3>
                                            <p><FontAwesomeIcon icon={faEnvelope} /> Email: {profData && profData.email}</p>
                                            {job && (
                                                <div>
                                                    <p><FontAwesomeIcon icon={faBriefcase} /> Job Title: {job.title}</p>
                                                    <p><FontAwesomeIcon icon={faBuilding} /> Company: {job.company}</p>
                                                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Location: {job.location}</p>
                                                    <p><FontAwesomeIcon icon={faClock} /> Status: {candidate.status}</p>
                                                    <p>
                                                    <FontAwesomeIcon icon={faFileAlt} /> Resume:                                                        {candidate.resume ? (
                                                            <button onClick={() => handleDownloadResume(candidate.userId)}>
                                                                Download Resume
                                                            </button>
                                                        ) : (
                                                            'No resume available'
                                                        )}
                                                    </p> 

                                                </div>
                                            )}
                                            <button 
                                                className="button"
                                                onClick={() => handleViewProfile(candidate.userId, candidate._id, candidate.jobId)}>
                                                <FontAwesomeIcon icon={faSearch} /> View Application
                                            </button>
                                            <div className="action-buttons">
                                                <button 
                                                    className="reject"
                                                    onClick={() => handleActionClick('Reject', candidate._id)}
                                                    disabled={loading} // Disable button while loading
                                                >
                                                    {loading ? 'Rejecting...' : 'Reject'}
                                                </button>
                                                <button 
                                                    className="schedule"
                                                    onClick={() => handleActionClick('Schedule Interview', candidate._id)}
                                                >
                                                    Schedule Interview
                                                </button>
                                                <button 
                                                    className="offer"
                                                    onClick={() => handleActionClick('Offer', candidate._id)}
                                                >
                                                    Offer
                                                </button>
                                                <button 
                                                    className="success"
                                                    onClick={() => handleActionClick('Success', candidate._id)}
                                                >
                                                    Success
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>


  {/* Profile Modal */}
  {modalVisible && (
                <div className="user-View-modal">
                    <div className="user-modal-content">
                        <span className="user-close" onClick={closeModal}>&times;</span>
                        {profileData && (
                            <div>
                               <h2>Profile Details</h2>
                                <p>Name: {profileData.firstName} {profileData.middleName} {profileData.lastName}</p>
                                <p>Email: {profileData.email}</p>
                                <p>Phone: {profileData.cellNumber}</p>
                                <p>Date of Birth: {new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                                <p>Gender: {profileData.gender}</p>
                                <p>Citizenship: {profileData.citizenship}</p>
                                <p>Skills: {profileData.skills.join(', ')}</p>
                                <p>Status: {profileData.status}</p>
                                <p>Position: {profileData.position}</p>
                                <p>Location: {profileData.location.address}, {profileData.location.city}, {profileData.location.province}, {profileData.location.zipCode}, {profileData.location.country}</p>
                                <h3>Experience</h3>
                                <ul>
                                    {profileData.experience.map((exp, index) => (
                                        <li key={index}>
                                            <p>{exp.title} at {exp.company}</p>
                                            <p>{exp.startDate} - {exp.endDate}</p>
                                            <p>{exp.employmentType}</p>
                                            <p>Responsibilities: {exp.responsibilities}</p>
                                        </li>
                                    ))}
                                </ul>
                                <h3>Education</h3>
                                <ul>
                                    {profileData.education.map((edu, index) => (
                                        <li key={index}>
                                            <p>{edu.degree} in {edu.fieldOfStudy}</p>
                                            <p>{edu.startDate} - {edu.endDate}</p>
                                            <p>{edu.institution}</p>
                                            <p>{edu.institutionType}</p>
                                        </li>
                                    ))}
                                </ul>
                                <h3>Other Documents</h3>
                                <ul>
                                    {profileData.otherDocuments.map((doc, index) => (
                                        <li key={index}>
                                            <a href={doc} target="_blank" rel="noopener noreferrer">Document {index + 1}</a>
                                        </li>
                                    ))}

                                </ul>
                                <h3>Job Information And Requirements</h3>
                                <p>Title: {jobData.title}</p>
                                <p>Description: {jobData.description}</p>
                                <p>Company: {jobData.company}</p>
                                <p>Location: {jobData.location}</p>
                                <p>Salary: {jobData.salary}</p>
                                <p>Requirements: {jobData.requirements}</p>
                                <p>Skills: {jobData.skills.join(', ')}</p>
                                <p>Employment Type: {jobData.employmentType}</p>
                                <p>Work Experience: {jobData.workExperience}</p>
                                <p>Posted On: {new Date(jobData.createdAt).toLocaleDateString()}</p>
                                <p>Updated On: {new Date(jobData.updatedAt).toLocaleDateString()}</p>
                                <p>Closing Date: {new Date(jobData.closingDate).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminViewCandidates;
