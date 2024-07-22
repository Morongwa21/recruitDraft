import React, { useState, useEffect } from 'react';
import './components/JobPosting.css'; 
import './components/UserViewPosts.css'; 

import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUser, faUsers, faBell, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
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

    const [profileData, setProfileData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
        fetchCandidates();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
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
            const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/applications');

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
            const jobDetailsPromises = jobIds.map(jobId =>
                axios.get(`https://recruitment-portal-l0n5.onrender.com/jobs/${jobId}`)
            );

            const jobDetailsResponses = await Promise.all(jobDetailsPromises);
            const jobDetails = jobDetailsResponses.map(response => response.data);
            setJobs(jobDetails);

            // Fetch profile data for each candidate
            await Promise.all(applications.map(async (application) => {
                const profileResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/profile/${application.userId}`);
                if (profileResponse.status === 200) {
                    setProfData(profileResponse.data);
                    console.log('proo:',profileResponse )
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
            const profileResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/profile/${userId}`);
            const applicationResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/applications/${appId}`);
            const jobResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/jobs/${jobId}`);
            if (profileResponse.status === 200 && applicationResponse.status === 200 && jobResponse.status === 200) {
                setProfileData(profileResponse.data);
                setApplicationData(applicationResponse.data);
                setJobData(jobResponse.data);
                setModalVisible(true);
                console.log('profile: ', profileResponse);
                console.log('Application data: ', applicationResponse);
                console.log('Job Details: ', jobResponse);
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
                        <li><a href="#analytics"><FontAwesomeIcon icon={faChartBar} /> Analytics</a></li>
                        {/* <li><a href="#notifications"><FontAwesomeIcon icon={faBell} /> Notifications</a></li> */}
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
                            {candidatesToDisplay.map(candidate => (
                                <li key={candidate._id}>
                                    <div className="admin-job-container">
                                    <h3>Full Names: {profData && profData.firstName} {profData && profData.middleName} {profData && profData.lastName}
</h3>
                                        <p>Email: {profData && profData.email}</p>
                                        {jobs.map(job => job._id === candidate.jobId && (
                                            <div key={job._id}>
                                                <p>Job Title: {job.company}</p>
                                                <p>Job Description: {job.title}</p>
                                                <p>Job location: {job.location}</p>
                                                <p>Status: {candidate.status}</p>
                                               </div>
                                        ))}
                                         <button 
                                                   className="button"
                                                   onClick={() => handleViewProfile(candidate.userId, candidate._id, candidate.jobId)}>View Profile</button>                                            
                                                   </div>
                                </li>
                            ))}
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
