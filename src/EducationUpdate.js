import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import logo from './company logo.jpg';
import './components/AdminDash.css';
import './components/ModalContent.css';

const EducationUpdate = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); 
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [degree, setHighestQualification] = useState('');
    const [qualificationDocuments, setQualificationDocuments] = useState(null);
    const [fieldOfStudy, setFieldOfQualification] = useState('');
    const [otherDocuments, setOtherDocuments] = useState([]);
    const [institution, setInstitutionName] = useState('');
    const [status, setStatus] = useState('');
    const [endDate, setEndDate] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [existingEducation, setExistingEducation] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentEducation, setCurrentEducation] = useState(null); // To store current education being edited

    useEffect(() => {
        fetchUserDetails();
        fetchExistingEducation();
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
                setExistingEducation(response.data.education || []); // Ensure a default empty array if no data
            } else {
                console.error('Failed to fetch existing education details');
            }
        } catch (error) {
            console.error('Error fetching existing education details:', error.message);
        }
    };

    const handleNextClick = () => {
        const userId = localStorage.getItem('userId');
        if (degree && qualificationDocuments && fieldOfStudy && institution && status) {
            const educationData = {
                degree,
                qualificationDocuments,
                fieldOfStudy,
                otherDocuments: otherDocuments.map(doc => doc.name),
                institution,
                status,
                endDate
            };

            localStorage.setItem('educationData', JSON.stringify(educationData));
            setShowSuccessPopup(true);
            setTimeout(() => {
                setShowSuccessPopup(false);
                navigate('/WorkExperience');
            }, 2000);
        } else {
            alert('Please fill out all required fields.');
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        if (e.target.value === 'Completed') {
            setEndDate(new Date().toISOString().substr(0, 10));
        } else {
            setEndDate('');
        }
    };

    const handleQualificationDocumentsChange = (e) => {
        setQualificationDocuments(e.target.files[0]);
    };

    const handleOtherDocumentsChange = (e) => {
        setOtherDocuments(Array.from(e.target.files));
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        navigate('/LoginPage');
    };

    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
        if (editMode) {
            setEditMode(false);
            setCurrentEducation(null);
        }
    };

    const handleCloseClick = () => {
        setFormVisible(false);
        setEditMode(false);
        setCurrentEducation(null);
    };

    const handleEditClick = (edu) => {
        setCurrentEducation(edu);
        setHighestQualification(edu.degree);
        setFieldOfQualification(edu.fieldOfStudy);
        // Set other fields as needed
        setEditMode(true);
        setFormVisible(true);
    };

    const handleUpdateClick = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const updatedEducationData = {
                degree,
                qualificationDocuments,
                fieldOfStudy,
                otherDocuments: otherDocuments.map(doc => doc.name),
                institution,
                status,
                endDate
            };

            const response = await axios.patch(`https://recruitment-portal-l0n5.onrender.com/profile`, updatedEducationData);
            if (response.status === 200) {
                console.log('Education details updated successfully');
                setShowSuccessPopup(true);
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    navigate('/WorkUpdate');
                }, 2000);
            } else {
                console.error('Failed to update education details');
            }
        } catch (error) {
            console.error('Error updating education details:', error.message);
        }
    };



    //for tesing delete
    const handleDeleteClick = async (eduId) => {
        try {
            const response = await axios.delete(`https://recruitment-portal-l0n5.onrender.com/profile/${eduId}`);
            if (response.status === 200) {
                console.log('Education details deleted successfully');
                fetchExistingEducation(); // Refresh the education list
            } else {
                console.error('Failed to delete education details');
            }
        } catch (error) {
            console.error('Error deleting education details:', error.message);
        }
    };



    const renderExistingEducation = () => {
        if (existingEducation && existingEducation.length > 0) {
            console.log('edu list: ', existingEducation)
            return (
                <div>
                    <h2>Existing Education Details:</h2>
                    {existingEducation.map((edu, index) => (
                        <div key={index} className="education-card">
                            <div className="education-info">
                                <h3>Education {index + 1}</h3>
                                <div className="education-details">
                                    <span className="education-label">Degree:</span> {edu.degree}
                                </div>
                                <div className="education-details">
                                    <span className="education-label">Field of Study:</span> {edu.fieldOfStudy}
                                </div>
                                <div className="education-details">
                                    <span className="education-label">Institution:</span> {edu.institution}
                                </div>
                                <div className="education-details">
                                    <span className="education-label">Institution Type:</span> {edu.institutionType}
                                </div>
                            </div>
                            <button 
                                className="delete-button" 
                                onClick={() => handleDeleteClick(edu._id)}>
                                <FaTrash className="delete-icon" />
                            </button>
                        </div>
                    ))}
                </div>
            );
        } else {
            return <p>No existing education data found.</p>;
        }
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
                        <button className="red-button" onClick={() => navigate('/ProfileUpdate')}>Personal Info</button>
                        <button className="red-button" onClick={() => navigate('/EducationUpdate')}>Education</button>
                        <button className="red-button" onClick={() => navigate('/WorkUpdate')}>Work Experience</button>
                    </div>
                    <div className="Redbutton-container">
                        <button className="redish-button" onClick={toggleFormVisibility}>+ Add More Education</button>
                    </div>




                    {formVisible && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="close-button" onClick={handleCloseClick}>X</div>
                                <div className="field-text">Fields with * indicate required</div>
                                <div className="question-text">Highest Qualification *</div>
                                <select
                                    className="edit-box"
                                    value={degree}
                                    onChange={(e) => setHighestQualification(e.target.value)}
                                    required
                                >
                                    <option value="">Select Highest Qualification</option>
                                    <option value="PhD">PhD</option>
                                    <option value="Master's Degree">Master's Degree</option>
                                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Certificate">Certificate</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="question-text">Qualification Documents *</div>
                                <input
                                    type="file"
                                    className="edit-box"
                                    onChange={handleQualificationDocumentsChange}
                                    accept=".pdf, .doc, .docx"
                                    required
                                />
                                <div className="question-text">Specify Field of Qualification *</div>
                                <input
                                    type="text"
                                    className="edit-box"
                                    value={fieldOfStudy}
                                    onChange={(e) => setFieldOfQualification(e.target.value)}
                                    required
                                />
                                <div className="question-text">Add other Documents</div>
                                <input
                                    type="file"
                                    className="edit-box"
                                    multiple
                                    onChange={handleOtherDocumentsChange}
                                    accept=".pdf, .doc, .docx"
                                />
                                <div className="question-text">Name of Institution *</div>
                                <input
                                    type="text"
                                    className="edit-box"
                                    value={institution}
                                    onChange={(e) => setInstitutionName(e.target.value)}
                                    required
                                />
                                <div className="question-text">Status *</div>
                                <select
                                    className="edit-box"
                                    value={status}
                                    onChange={handleStatusChange}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Completed">Completed</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Withdrawn">Withdrawn</option>
                                    <option value="Other">Other</option>
                                </select>
                                {status === 'Completed' && (
                                    <div>
                                        <div className="question-text">End Date *</div>
                                        <input
                                            type="date"
                                            className="edit-box"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                                {editMode ? (
                                    <button className="blue-button" onClick={handleUpdateClick}>Update</button>
                                ) : (
                                    <button className="blue-button" onClick={handleNextClick}>Save</button>
                                )}
                            </div>
                        </div>
                    )}
                    {showSuccessPopup && (
                        <div className="success-popup">
                            <p>Saved successfully!</p>
                        </div>
                    )}
                    {renderExistingEducation()}
                </div>
            </div>
        </div>
    );
};

export default EducationUpdate;
