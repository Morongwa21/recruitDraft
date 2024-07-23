import React, { useState, useEffect } from 'react';
import './components/JobPosting.css'; // Import CSS for styling
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faChartBar, faTrashAlt, faUser, faUsers, faBell, faHome } from '@fortawesome/free-solid-svg-icons';
import logo from './company logo.jpg';
import { Link } from 'react-router-dom';

const AdminJobsView = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [editingJobId, setEditingJobId] = useState(null);
    const [editedJob, setEditedJob] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [username, setUsername] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const navigate = useNavigate();
    const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];

    useEffect(() => {
        fetchJobPostings();
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            // Fetch user details using stored user ID
            const userId = localStorage.getItem('userId');
            console.log('Fetching details for user ID:', userId);
            const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
            console.log('User details response:', response); // Log the full response

            if (response.status === 200) {
                setUsername(response.data.username);
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    const fetchJobPostings = async () => {
        try {
            const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/jobs/org/recruiter');
            setJobPostings(response.data);
        } catch (error) {
            console.error('Error fetching job postings:', error.message);
        }
    };

    const handleAddNewJobClick = () => {
        navigate('/CreateJob'); // Navigate to the CreateJob page
    };

    const handleEditClick = (job) => {
        setEditingJobId(job._id);
        setEditedJob(job);
    };

    const handleDeleteClick = async (jobId) => {
        try {
            await axios.delete(`https://recruitment-portal-l0n5.onrender.com/job/${jobId}`);
            fetchJobPostings(); // Refresh job postings after deletion
        } catch (error) {
            console.error('Error deleting job:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedJob({ ...editedJob, [name]: value });
    };

    const handleSaveClick = async () => {
        try {
            await axios.patch(`https://recruitment-portal-l0n5.onrender.com/job/${editingJobId}`, editedJob);
            fetchJobPostings(); // Refresh job postings after saving
            setEditingJobId(null); // Exit editing mode
        } catch (error) {
            console.error('Error updating job:', error.message);
        }
    };

    const filteredJobPostings = jobPostings.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())||
        job.workExperience.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.employmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.closingDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requirements.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.toLowerCase().includes(searchQuery.toLowerCase())
   
        
    );

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
                    <h2>Job Postings</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search jobs by title, company, location, description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input input-field"
                        />
                        <button onClick={() => setSearchQuery(searchQuery)} className="search-button">Search</button>
                    </div>

                    <section className="job-listings">
                        <table>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Location</th>
                                    <th>Salary</th>
                                    <th>Description</th>
                                    <th>Work Experience</th>
                                    <th>Employment Type</th>
                                    <th>Closing Data</th>
                                    <th>Requirements</th>
                                    <th>Skills</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
       
                                </tr>
                            </thead>
                            <tbody>
                                {filteredJobPostings.map((job) => (
                                    <tr key={job._id}>
                                        {editingJobId === job._id ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={editedJob.title}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        value={editedJob.company}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={editedJob.location}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="salary"
                                                        value={editedJob.salary}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="description"
                                                        value={editedJob.description}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="workExperience"
                                                        value={editedJob.workExperience}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        name="employmentType"
                                                        value={editedJob.employmentType}
                                                        onChange={handleInputChange}
                                                    >
                                                        {employmentTypes.map((type) => (
                                                            <option key={type} value={type}>
                                                                {type}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="closingDate"
                                                        value={editedJob.closingDate}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="requirements"
                                                        value={editedJob.requirements}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="skills"
                                                        value={editedJob.skills}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                          
                                                    <button onClick={handleSaveClick}>Save</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{job.title}</td>
                                                <td>{job.company}</td>
                                                <td>{job.location}</td>
                                                <td>{job.salary}</td>
                                                <td>{job.description}</td>
                                                <td>{job.workExperience}</td>
                                                <td>{job.employmentType}</td>
                                                <td>{job.closingDate}</td>
                                                <td>{job.requirements}</td>
                                                <td>{job.skills}</td>


                                                <td>
                                                    <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={() => handleEditClick(job)} />
                                                </td>
                                                <td>
                                                    <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => handleDeleteClick(job._id)} />
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    <footer className="page-footer">
                        <button className="add-new-job-btn" onClick={handleAddNewJobClick}>Add New Job</button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default AdminJobsView;
