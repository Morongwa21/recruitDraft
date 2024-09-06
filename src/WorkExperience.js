import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import logo from './company logo.jpg';
import './components/AdminDash.css';
import './components/ModalContent.css';

const WorkExperience = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [hasExperience, setHasExperience] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [responsibilities, setResponsibilities] = useState([]);
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const [formData, setFormData] = useState({
        userData: {},
        educationData: {},
        profData: {},
        data: {},
        workExperienceData: {},
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://recruitment-portal-utcp.onrender.com/user/${userId}`);
                if (response.status === 200) {
                    setUsername(response.data.username);
                    setFormData(prevState => ({
                        ...prevState,
                        profData: response.data, 
                    }));
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            }
        };

        const data = JSON.parse(localStorage.getItem('data')) || {};
        const educationData = JSON.parse(localStorage.getItem('educationData')) || {};
        const workExperienceData = JSON.parse(localStorage.getItem('workExperienceData')) || {};

        setFormData(prevFormData => ({
            ...prevFormData,
            data,
            educationData,
            workExperienceData,
        }));

        fetchUserDetails();
    }, []);

    const handleNextClick = async () => {
        if (hasExperience === 'Yes' && responsibilities.length === 0) {
            alert('Please select at least one responsibility.');
            return;
        }

        const workExperienceData = {
            hasExperience,
            company,
            position,
            responsibilities: responsibilities.map(option => option.value),
            startDate: startDate.toISOString(),
            endDate: inProgress ? 'Present' : endDate.toISOString(),
        };

        console.log('WorkExperience Data:', workExperienceData);
        localStorage.setItem('workExperienceData', JSON.stringify(workExperienceData));

        const combinedData = {
            ...formData.data,
            ...formData.educationData,
            workExperienceData,
        };

        console.log('Data to be stored:', combinedData);

        try {
            const response = await axios.post('https://recruitment-portal-l0n5.onrender.com/profile', combinedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('POST request successful:', response.data);
            navigate('/ProfileUsers');
        } catch (error) {
            console.error('Error making POST request:', error);
        }

        localStorage.removeItem('workExperienceData');
    };

    const handleExperienceChange = (e) => {
        setHasExperience(e.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const responsibilityOptions = [
        { value: 'Project Management', label: 'Project Management' },
        { value: 'Team Leadership', label: 'Team Leadership' },
        { value: 'Software Development', label: 'Software Development' },
        { value: 'Customer Relations', label: 'Customer Relations' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Other', label: 'Other' },
    ];

    const handleViewPost = () => {
        navigate('/ViewPost');
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

    const handleProgressChange = () => {
        setInProgress(!inProgress);
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
                        <button className="redish-button" onClick={toggleFormVisibility}>+ Click to Add Work Experience</button>
                    </div>
                    {formVisible && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="modal-close" onClick={handleCloseClick}>X</div>
                                <div className="field-text">Fields with * indicate required</div>
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
                                    {!inProgress && (
                                        <div className="form-column">
                                            <div className="question-text">End Date:</div>
                                            <input
                                                type="date"
                                                id="endDate"
                                                className="edit-box"
                                                value={endDate.toISOString().substr(0, 10)}
                                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                            />
                                        </div>
                                    )}
                                    <div className="form-column">
                                        <div className="question-text">Progress</div>
                                        <div className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                id="inProgress"
                                                className="checkbox-input"
                                                checked={inProgress}
                                                onChange={handleProgressChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className="blue-button" onClick={handleNextClick}>Submit</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkExperience;
