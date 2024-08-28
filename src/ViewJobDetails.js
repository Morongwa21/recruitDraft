import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; 
import './components/ViewJobDetails.css';
import logo from './company logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faBriefcase, faCalendarAlt, faUsers, faClipboardList, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ViewJobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`https://recruitment-portal-t6a3.onrender.com/jobs/${id}`);
                setJob(response.data);
                console.log('Job Details:', response.data); // Log the job details
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="spinner-container">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
        );
    }
    const {
        company,
        title,
        location,
        jobType,
        createdAt,
        numApplications,
        jobSummary,
        responsibilities = [],
        requirements = [],
    } = job;
    const handleSignIn = () => {
        // Navigate to the login page
        navigate('/LoginPageA');
    };

    return (

    <div>
    <div className="logos">
        <img src={logo} alt="Company Logo" />
    </div>
    <h1 className="job-details-heading">Job Details</h1>
    <div className="user-view-post-container">
        <div className="user-view-post-header">
        <h2><FontAwesomeIcon icon={faBuilding} /> {company}</h2>
                    <h3><FontAwesomeIcon icon={faBriefcase} /> {title}</h3>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {location}</p>
        </div>
        <div className="user-view-post-info">
            <div>
            <h4><FontAwesomeIcon icon={faBriefcase} /> Job Type:</h4>
                        <p>{jobType || 'N/A'}</p>
            </div>
            <div>
            <h4><FontAwesomeIcon icon={faCalendarAlt} /> Date Posted:</h4>
                        <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
            <div>
            <h4><FontAwesomeIcon icon={faUsers} /> Number of Applications:</h4>
                        <p>{numApplications || 'N/A'}</p>
            </div>
        </div>
        <div className="user-view-post-description">
        <h4><FontAwesomeIcon icon={faClipboardList} /> Job Summary</h4>            <p>{jobSummary || 'No summary available.'}</p>
            {Array.isArray(responsibilities) && responsibilities.length > 0 && (
                <>
                            <h4><FontAwesomeIcon icon={faCheckCircle} /> Responsibilities</h4>
                    <ul>
                    {responsibilities.map((responsibility, index) => (
                                    <li key={index}>{responsibility}</li>

                        ))}
                    </ul>
                </>
            )}
    {Array.isArray(requirements) && requirements.length > 0 && (
                        <>
                            <h4><FontAwesomeIcon icon={faCheckCircle} /> Requirements</h4>
                            <ul>
                                {requirements.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
        <div className="user-view-post-buttons">
        <button onClick={handleSignIn}>Sign In To Apply</button>
            <button onClick={() => navigate(-1)}>Back to Job Listings</button>
        </div>
    </div>
</div>
);
};

export default ViewJobDetails;