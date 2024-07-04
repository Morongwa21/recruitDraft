import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/UserViewPosts.css';
import logo from './company logo.jpg';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const UserViewPost = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, [currentPage]);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/jobs'); 
            console.log('API Response:', response); 
            console.log('Response Headers:', response.headers); 
            const totalCount = response.headers['x-total-count'];
            console.log('Total Count:', totalCount);
            const calculatedTotalPages = Math.ceil(totalCount / 5);
            console.log('Calculated Total Pages:', calculatedTotalPages);
            setJobs(response.data);
            setFilteredJobs(response.data);
            setTotalPages(calculatedTotalPages);

        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleSearch = (keyword, location) => {
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(keyword.toLowerCase()) &&
            job.location.toLowerCase().includes(location.toLowerCase())
        );
        setFilteredJobs(filtered);
    };

    const handleFilter = (name, value) => {
        const filtered = jobs.filter(job => job[name].toLowerCase().includes(value.toLowerCase()));
        setFilteredJobs(filtered);
    };

    const handleSelectJob = (job) => {
        setSelectedJob(job);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
 
    
    return (
        <div>
            <Header />
            <SearchBar onSearch={handleSearch} />
            <Filters onFilter={handleFilter} />
            <JobListings jobs={filteredJobs} onSelectJob={handleSelectJob} />
        </div>
    );
};

const Header = () => (
    <header className="header">
     <img src={logo}alt="Company Logo" className="logo" />
        <nav className="nav">
            <a href="/" className="nav-link">Home</a>
            {/* <a href="/jobs" className="nav-link">Jobs</a> */}
            <a href="/LoginPageA" className="nav-link">Sign-In|Sign-Up</a>
        </nav>
    </header>
);

const SearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');

    return (
        
        <div className="search-bar">
            <input
                type="text"
                placeholder="Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="input"
            />
           
           <button onClick={() => onSearch(keyword)} className="search-button">
                <FontAwesomeIcon icon={faSearch} />
            </button>      
 </div>
    );
};

const Filters = ({ onFilter }) => (
    <div className="filters">
        <select name="location" onChange={(e) => onFilter(e.target.name, e.target.value)} className="select">
            <option value="">Location</option>
            <option value="es">Eastern Cape</option>
            <option value="fs">Free state</option>
            <option value="gu">Gauteng</option>
            <option value="lp">Limpopo</option>
            <option value="mp">Mpumalanga</option>
            <option value="nw">North West</option>
            <option value="nc">Northen Cape</option>
            <option value="Ea">Western Cape</option>




        </select>
        <select name="department" onChange={(e) => onFilter(e.target.name, e.target.value)} className="select">
            <option value="">Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Operations">Operations</option>
            <option value="Research and Development (R&D)">Research and Development (R&D)</option>
            <option value="Administration">Administration</option>
            <option value="Legal">Legal</option>
            <option value="Procurement">Procurement</option>
            <option value="Quality Assurance (QA)">Quality Assurance (QA)</option>
            <option value="Public Relations (PR)">Public Relations (PR)</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Production">Production</option>
            <option value="Logistics">Logistics</option>
            <option value="Training and Development">Training and Development</option>
            <option value="Business Development">Business Development</option>
            <option value="Supply Chain Management">Supply Chain Management</option>



        </select>
        <select name="jobType" onChange={(e) => onFilter(e.target.name, e.target.value)} className="select">
            <option value="">Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Part-time">Part-time</option>

            <option value="Contract">Contract</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Apprenticeship">Apprenticeship</option>

            <option value="Temporary">Temporary</option>
            <option value="Freelance">Freelance</option>

        </select>
        <select name="salaryRange" onChange={(e) => onFilter(e.target.name, e.target.value)} className="select">
            <option value="">Salary Range</option>
            <option value="0-50000">R0 - R50,000</option>
            <option value="50000-100000">R50,000 - R100,000</option>
        </select>
    </div>
);

const JobListings = ({ jobs, onSelectJob }) => {
    const navigate = useNavigate();

    return (
        <div className="job-listings">
            {jobs.map((job) => (
                <div key={job._id} className="job-container">
                    <div className="job-card" onClick={() => onSelectJob(job)}>
                        <h3>{job.title}</h3>
                        <p>Company: {job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Posted On: {new Date(job.createdAt).toLocaleDateString()}</p>
                        <p>Job Type: {job.jobType}</p>
                        <p>Number of Applications: {job.numApplications}</p>
                        <button
              className="button"
              onClick={() => navigate(`/ViewJobDetails/${job._id}`)}
            >
              View Details
            </button>                    </div>
                </div>
            ))}
        </div>
    );
};





export default UserViewPost;
