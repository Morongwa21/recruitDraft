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
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, [currentPage]);

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`https://recruitment-portal-rl5g.onrender.com/jobs?page=${currentPage}`);
            console.log('response:', response)
            const totalCount = parseInt(response.headers['x-total-count'], 10);
            setJobs(response.data);
            setFilteredJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
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