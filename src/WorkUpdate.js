import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios'; // Import Axios for making HTTP requests
import logo from './company logo.jpg';
import './components/AdminDash.css';
import './components/ModalContent.css';

const WorkUpdate = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); 
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);

    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [responsibilities, setResponsibilities] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
            const profileResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/profile`);

            if (response.status === 200) {
                setUsername(response.data.username);
            } else {
                console.error('Failed to fetch user details');
            }

            // Fetch work experience data from profile
            if (profileResponse.status === 200) {
                const workExperienceData = profileResponse.data.workExperience;
                if (workExperienceData && workExperienceData.length > 0) {
                    const latestWorkExperience = workExperienceData[workExperienceData.length - 1];
                    setCompany(latestWorkExperience.company || '');
                    setPosition(latestWorkExperience.position || '');
                    setResponsibilities(latestWorkExperience.responsibilities || []);
                    setStartDate(new Date(latestWorkExperience.startDate) || new Date());
                    setEndDate(new Date(latestWorkExperience.endDate) || new Date());

                    setStatus(latestWorkExperience.status || '');
                }
            } else {
                console.error('Failed to fetch work experience data');
            }
        } catch (error) {
            console.error('Error fetching user details or work experience data:', error.message);
        }
    };

    const handleUpdateClick = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const workExperienceData = {
                company,
                position,
                responsibilities,
                startDate,
                endDate,
                status,
            };

            // Send work experience data to API
            const response = await axios.patch(`https://recruitment-portal-l0n5.onrender.com/profile`, {
                workExperience: workExperienceData,
            });

            if (response.status === 200) {
                console.log('Work experience data updated successfully');
                // Optionally handle success UI update or navigation
                navigate('/SomePage'); // Navigate to a success page or another route
            } else {
                console.error('Failed to update work experience data');
            }
        } catch (error) {
            console.error('Error updating work experience data:', error.message);
        }
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        navigate('/LoginPage');
    };

    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
    };

    const handleCloseClick = () => {
        setFormVisible(false);
    };

    const statusOptions = [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' },
        { value: 'Freelance', label: 'Freelance' },
    ];

    const responsibilityOptions = [
        { value: 'Project Management', label: 'Project Management' },
        { value: 'Team Leadership', label: 'Team Leadership' },
        { value: 'Software Development', label: 'Software Development' },
        { value: 'Customer Relations', label: 'Customer Relations' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Other', label: 'Other' },
    ];

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
                    <div className="Redbutton-container">
                        <button className="redish-button" onClick={toggleFormVisibility}>+Click to Add Work Experience</button>
                    </div>
                    <div className="existing-work-experience">
                        <h2>Current Work Experience</h2>
                        <p><strong>Company:</strong> {company}</p>
                        <p><strong>Position:</strong> {position}</p>
                        <p><strong>Responsibilities:</strong> {responsibilities.map(res => res.label).join(', ')}</p>
                        <p><strong>Start Date:</strong> {startDate.toISOString().substr(0, 10)}</p>
                        <p><strong>End Date:</strong> {endDate.toISOString().substr(0, 10)}</p>

                        <button className="blue-button" onClick={toggleFormVisibility}>Update Work Experience</button>
                    </div>

                    {formVisible && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="close-button" onClick={handleCloseClick}>X</div>
                                <div className="form-columns">
                                    <div className="form-column">
                                        <div className="question-text">Company</div>
                                        <input
                                            type="text"
                                            className="edit-box"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-column">
                                        <div className="question-text">Position</div>
                                        <input
                                            type="text"
                                            className="edit-box"
                                            value={position}
                                            onChange={(e) => setPosition(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-column">
                                        <div className="question-text">Responsibility</div>
                                        <Select
                                            options={responsibilityOptions}
                                            value={responsibilities}
                                            onChange={(selectedOptions) => setResponsibilities(selectedOptions)}
                                            className="edit-box"
                                            placeholder="Select Responsibility"
                                            isMulti
                                        />
                                    </div>
                                    <div className="form-column">
                                        <div className="question-text">Start Date:</div>
                                        <input
                                            type="date"
                                            id="startDate"
                                            className="edit-box"
                                            value={startDate.toISOString().substr(0, 10)}
                                            onChange={(e) => setStartDate(new Date(e.target.value))}
                                            required
                                        />
                                    </div>
                                    <div className="form-column">
                                        <div className="question-text">Status</div>
                                        <Select
                                            options={statusOptions}
                                            value={status}
                                            onChange={(selectedOption) => setStatus(selectedOption)}
                                            className="edit-box"
                                            placeholder="Select Status"
                                        />
                                    </div>
                                </div>
                                <button className="blue-button" onClick={handleUpdateClick}>Update Work Experience</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkUpdate;
