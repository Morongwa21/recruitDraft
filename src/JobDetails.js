import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './components/JobDetails.css'; 
import logo from './company logo.jpg'; // Make sure to provide the correct path for your logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const JobDetails = () => {
    const { jobId } = useParams();
    const { appId } = useParams();

    const [job, setJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`https://recruitment-portal-utcp.onrender.com/jobs/${jobId}`);
                setJob(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error.message);
            }
        };

        fetchJobDetails();
    }, [jobId]);
  
    if (!job) {
        return <div>Loading job details...</div>;
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div className="admin-page">
        <header className="admin-header">
            <div className="logo">
                <img src={logo} alt="Company Logo" />
            </div>
            </header>
            <h2><strong>Job Details</strong></h2>
        <div className="job-details-container">
           
        <h1>{job.title}</h1>
        <p><strong>Company:</strong> {job.company}</p>
                <p className="description"><strong>Description:</strong> {job.description}</p>
                <p><strong>Closing Date:</strong> {new Date(job.closingDate).toLocaleDateString()}</p>
                <p><strong>Employment Type:</strong> {job.employmentType}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Requirements:</strong> {job.requirements}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                <p><strong>Work Experience:</strong> {job.workExperience}</p>
                <p><strong>Posted At:</strong> {formatDate(job.createdAt)}</p>
                <p><strong>Updated At:</strong> {formatDate(job.updatedAt)}</p>
            <div className="back-link">
                <Link to="/ViewAJobs">&larr; Back to Job Applications</Link>

            </div>
        </div>
        </div>
    );
};

export default JobDetails;
