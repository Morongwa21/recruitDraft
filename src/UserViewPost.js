import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/UserViewPosts.css';
import logo from './company logo.jpg';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignInAlt, faHome } from '@fortawesome/free-solid-svg-icons';

const UserViewPost = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(1);
    const jobsPerPage = 5;

    useEffect(() => {
        fetchJobs(currentPage);
    }, [currentPage]);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/jobs');
            console.log('API Response:', response);
            console.log('Response Headers:', response.headers);

            setJobs(response.data);
            setFilteredJobs(response.data);
            setTotalPages(Math.ceil(response.data.total / jobsPerPage));
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleSearch = (keyword) => {
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(keyword.toLowerCase()) ||
            job.location.toLowerCase().includes(keyword.toLowerCase())
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
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <Header />
            <SearchBar onSearch={handleSearch} />
            {/* <Filters onFilter={handleFilter} /> */}
            <JobListings jobs={filteredJobs} onSelectJob={handleSelectJob} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <img src={logo} alt="Company Logo" className="logo" />
            <nav className="nav">
                <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                    <FontAwesomeIcon icon={faHome} /> Home
                </a>
                <a href="/LoginPageA" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/LoginPageA'); }}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Sign-In|Sign-Up
                </a>
            </nav>
        </header>
    );
};

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
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/ViewJobDetails/${job._id}`);
                            }}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default UserViewPost;
