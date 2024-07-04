import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/AdminDash.css';
import './components/ModalContent.css';
import logo from './company logo.jpg';
import axios from 'axios';

const EducationPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [existingEducation, setExistingEducation] = useState(null);
    const [formData, setFormData] = useState({
        degree: '',
        qualificationDocuments: null,
        fieldOfStudy: '',
        otherDocuments: [],
        institution: '',
        startDate: '',
        endDate: '',
        institutionType: ''
    });
    const [inProgress, setInProgress] = useState(false);

    // Effect to store formData in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        fetchUserDetails();
        fetchExistingEducation();
    }, []);

    useEffect(() => {
        // Retrieve formData from localStorage if exists
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }
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

    const fetchExistingEducation = async () => {
        try {
            const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
            if (response.status === 200) {
                const educationData = response.data.education || [];
                setExistingEducation(educationData);

                // Store existing education data in localStorage
                localStorage.setItem('existingEducation', JSON.stringify(educationData));
            } else {
                console.error('Failed to fetch existing education details');
            }
        } catch (error) {
            console.error('Error fetching existing education details:', error.message);
        }
    };

    const handleNextClick = () => {
        const { degree, qualificationDocuments, fieldOfStudy, institution, startDate, endDate, institutionType } = formData;

        if (degree && qualificationDocuments && fieldOfStudy && institution && startDate && (inProgress || endDate) && institutionType) {
            const educationData = {
                ...formData,
                endDate: inProgress ? 'Present' : endDate,
                otherDocuments: formData.otherDocuments.map(doc => doc.name),
            };

            localStorage.setItem('educationData', JSON.stringify(educationData));
            console.log('Education Info', educationData)
            setShowSuccessPopup(true);
            setTimeout(() => {
                setShowSuccessPopup(false);
                navigate('/WorkExperience');
            }, 2000);
        } else {
            alert('Please fill out all required fields.');
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'otherDocuments' ? Array.from(files) : files[0]
        });
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
                        <li><a href="#home">Home</a></li>
                        <li><a href="/ProfileUsers">Profile</a></li>
                        <li><a href="/ViewPosts">Documents</a></li>
                        <li><a href="/IkusasaProgram">Job Listings</a></li>
                        <li><a href="/ViewAJobs">Job Applications</a></li>
                        <li><a href="/ScreeningPage">Screening</a></li>
                        <li><a href="#cta">Call-to-Action</a></li>
                    </ul>
                </aside>
                <div className="main-content" style={{ paddingTop: '4rem' }}>
                    <div className="button-container">
                        <button className="red-button" onClick={() => navigate('/ProfileEdit')}>Personal Info</button>
                        <button className="red-button" onClick={() => navigate('/EducationPage')}>Education</button>
                        <button className="red-button" onClick={() => navigate('/WorkExperience')}>Work Experience</button>
                    </div>
                    <div className="Redbutton-container">
                        <button className="redish-button" onClick={toggleFormVisibility}>+Click to Add Education Details</button>
                    </div>
                    {formVisible && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="modal-close" onClick={handleCloseClick}>X</div>
                                <div className="field-text">Fields with * indicate required</div>
                                <div className="question-text">Name of Institution *</div>
                                <input
                                    type="text"
                                    className="edit-box"
                                    name="institution"
                                    value={formData.institution}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="question-text">Institution Type *</div>
                                <select
                                    className="edit-box"
                                    name="institutionType"
                                    value={formData.institutionType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Institution Type </option>
                                    <option value="High School">High School</option>
                                    <option value="TVET college">TVET college</option>
                                    <option value="University Of Technology">University Of Technology</option>
                                    <option value="University">University</option>
                                </select>
                                <div className="question-text">Qualification *</div>
                                <select
                                    className="edit-box"
                                    name="degree"
                                    value={formData.degree}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Qualification</option>
                                    <option value="PhD">PhD</option>
                                    <option value="Master's Degree">Master's Degree</option>
                                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Certificate">Certificate</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="question-text">Specify Field of Qualification *</div>
                                <input
                                    type="text"
                                    className="edit-box"
                                    name="fieldOfStudy"
                                    value={formData.fieldOfStudy}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="question-text">Qualification Documents *</div>
                                <input
                                    type="file"
                                    className="edit-box"
                                    name="qualificationDocuments"
                                    onChange={handleFileChange}
                                    accept=".pdf, .doc, .docx"
                                    required
                                />
                                <div className="question-text">Add other Documents</div>
                                <input
                                    type="file"
                                    className="edit-box"
                                    name="otherDocuments"
                                    multiple
                                    onChange={handleFileChange}
                                    accept=".pdf, .doc, .docx"
                                />
                                <div className="question-text">Start Date *</div>
                                <input
                                    type="date"
                                    className="edit-box"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                                {!inProgress && (
                                    <div>
                                        <div className="question-text">End Date *</div>
                                        <input
                                            type="date"
                                            className="edit-box"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}
                                <div className="question-text">In Progress</div>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        id="progressCheckbox"
                                        checked={inProgress}
                                        onChange={handleProgressChange}
                                    />
                                </div>
                                <button className="blue-button" onClick={handleNextClick}>Save</button>
                            </div>
                        </div>
                    )}
                    {showSuccessPopup && (
                        <div className="success-popup">
                            <p>Saved successfully!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EducationPage;
