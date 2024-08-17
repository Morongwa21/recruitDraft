import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/UserViewPosts.css';
import logo from './company logo.jpg';  // Adjust the import as necessary
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faBuilding, faCalendarAlt, faTasks, faClock, faBriefcase, faDollarSign, faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FaUser } from 'react-icons/fa';


const IkusasaProgram = () => {
    const [username, setUsername] = useState('');
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Loading state

    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, [currentPage]);

    const fetchJobs = async () => {
        try {
            setLoading(true); 
            const response = await axios.get(`https://recruitment-portal-rl5g.onrender.com/jobs?page=${currentPage}`);
            console.log('response:', response)
            const totalCount = parseInt(response.headers['x-total-count'], 10);
            setJobs(response.data);
            setFilteredJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);

         } finally {
            setLoading(false); // Set loading to false after jobs are fetched
        }
    };

    const handleSearch = () => {
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(keyword.toLowerCase()) &&
            job.location.toLowerCase().includes(location.toLowerCase())
        );
        setFilteredJobs(filtered);
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/LoginPageA');
    };

    const handleChangePassword = () => {
        navigate('/changepassword');
    };
    const Spinner = () => (
        <div className="spinner"></div>
    );
    return (
        <div className="admin-page">
             <style>
                {`
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    border-left-color: #007bff; /* Primary color */
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto; /* Center the spinner */
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                `}
            </style>
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
            <div className="admin-content">
                <aside className="side">
                    <ul>
                         {/* <li><a href="#home">Home</a></li> */}
            <li><a href="/OneProfile">Profile</a></li>
            {/* <li><a href="/ViewPosts">Documents</a></li> */}
            <li><a href="/IkusasaProgram">Job Listings</a></li> 
            <li><a href="/ViewAJobs">Job Applications</a></li>
            <li><a href="/CVTemplate">Templates</a></li>
                    </ul>
                </aside>
                <div className="main-content">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="input"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="input"
                        />
                        <button onClick={handleSearch} className="search-button">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="job-listings">
    {filteredJobs.map((job) => (
        <div key={job._id} className="job-container">
            <div className="job-card" onClick={() => navigate(`/UserApply/${job._id}`)}>
                <h3 className="job-title">{job.title}</h3>

                <p className="job-description">
                    <strong>Description: </strong>
                    <FontAwesomeIcon icon={faBook} className="job-icons" />
                    {job.description}
                </p>
                <p className="job-company">
                    <strong>Company: </strong>
                    <FontAwesomeIcon icon={faBuilding} className="job-icons" />
                    {job.company}
                </p>

                <p className="job-location">
                    <strong>Location: </strong>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="job-icons" />
                    {job.location}
                </p>

                <p className="job-posted">
                    <strong>Posted On: </strong>
                    <FontAwesomeIcon icon={faCalendarAlt} className="job-icons" />
                    {new Date(job.createdAt).toLocaleDateString()}
                </p>

                <p className="job-closure">
                    <strong>Closing Date: </strong>
                    <FontAwesomeIcon icon={faCalendarAlt} className="job-icons" />
                    {new Date(job.closingDate).toLocaleDateString()}
                </p>

                <p className="job-employment-type">
                    <strong>Employment Type: </strong>
                    <FontAwesomeIcon icon={faBriefcase} className="job-icons" />
                    {job.employmentType}
                </p>


                <p className="job-employment-type">
                    <strong>Requirements: </strong>
                    <FontAwesomeIcon icon={faGraduationCap} className="job-icons" />
                    {job.requirements}
                </p>

                <p className="job-experience">
                    <strong>Work Experience: </strong>
                    <FontAwesomeIcon icon={faClock} className="job-icons" />
                    {job.workExperience}
                </p>

                <button className="button" onClick={() => navigate(`/UserApply/${job._id}`)}>View Details</button>
            </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};



export default IkusasaProgram;