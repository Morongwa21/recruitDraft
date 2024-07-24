import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaUserCircle, FaTrash, FaPlus, FaCity, FaEnvelope, FaPhone, FaUser, FaUniversity, FaBook, FaGraduationCap, FaCalendarAlt, FaBuilding, FaBriefcase, FaClock, FaTasks, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import './components/AdminDash.css';
import './components/OneProfile.css';

const ProfEdu = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [isModalOpenEdu, setIsModalOpenEdu] = useState(false);
    const [institution, setInstitution] = useState('');
    const [institutionType, setInstitutionType] = useState('');
    const [degree, setDegree] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [educationItem, setEducationItems] = useState([]);
    const [inProgress, setInProgress] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false); // New state to track saving status

    const fetchEducation = async () => {
        try {
            const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
            if (response.status === 200) {
                const profile = response.data.profile || {};
                const education = Array.isArray(profile.education) ? profile.education : [];
                setEducationItems(education);
            } else {
                console.error('Failed to fetch profile:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching education:', error.message);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, []);

    const handleEducation = async () => {
        setLoading(true);
    
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
    
        const educationItem = {
            institution,
            institutionType,
            degree,
            fieldOfStudy,
            startDate: formattedStartDate,
            endDate: inProgress ? null : formattedEndDate,
        };
    
        console.log('Education Item:', educationItem);
    
        try {
            const checkEducationResponse = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
            console.log('Existing Profile:', checkEducationResponse);
    
            if (checkEducationResponse.status === 200 && checkEducationResponse.data) {
                const existingProfile = checkEducationResponse.data;
                const updatedProfile = { ...existingProfile, education: [...(existingProfile.education || []), educationItem] };
    
                const updateResponse = await axios.patch('https://recruitment-portal-l0n5.onrender.com/profile', updatedProfile);
    
                if (updateResponse.status === 200) {
                    console.log('Education has been updated successfully:', updateResponse.data.message);
                    setIsSaved(true);
                    handleCloseModalEdu(); // Close modal after saving
                } else {
                    console.error('Failed to update education:', updateResponse.status, updateResponse.statusText);
                }
            } else {
                const createResponse = await axios.post('https://recruitment-portal-l0n5.onrender.com/profile', { education: [educationItem] });
                console.log('Create Response:', createResponse);
    
                if (createResponse.status === 201) {
                    console.log('Education saved successfully:', createResponse.data.message);
                    setIsSaved(true);
                    handleCloseModalEdu(); // Close modal after saving
                } else {
                    console.error('Failed to save education:', createResponse.status, createResponse.statusText);
                }
            }
        } catch (error) {
            console.error('Error saving education:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (educationId, index) => {
        try {
            const response = await axios.delete(`https://recruitment-portal-l0n5.onrender.com/profile/education/${educationId}`);
            if (response.status === 200) {
                console.log('Education deleted successfully');
                const updatedEducationItems = [...educationItem];
                updatedEducationItems.splice(index, 1);
                setEducationItems(updatedEducationItems);
            } else {
                console.error('Failed to delete education:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting education:', error.message);
        }
    };

    const handleEditClickEdu = () => {
        setIsModalOpenEdu(true);
    };

    const handleCloseModalEdu = () => {
        setIsModalOpenEdu(false);
    };

    const handleProgressChange = (e) => {
        setInProgress(e.target.checked);
        if (e.target.checked) {
            setEndDate(null); // Clear end date if progress is checked
        }
    };

    return (
        <div>
            {isModalOpenEdu && (
                <div className="modal-overlay">
                    <div className="modal">  {loading && (
              <div className="spinner-overlay">
                <div className="spinner"></div>
              </div>
            )}
                        <div className="modal-header">
                            <button className="close-button" onClick={handleCloseModalEdu}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="jobsekerBox">
                                <h><strong>Education</strong></h>
                                <div className="form-container">
                                    <div className="left-column">
                                        <div className="question-text">Institution *</div>
                                        <input type="text" className="edit-box" value={institution} onChange={(e) => setInstitution(e.target.value)} required />
                                    </div>
                                    <div className="right-column">
                                        <div className="question-text">Institution Type *</div>
                                        <select className="edit-box" value={institutionType} onChange={(e) => setInstitutionType(e.target.value)} required>
                                            <option value="">Select Institution Type</option>
                                            <option value="University">University</option>
                                            <option value="College">College</option>
                                            <option value="High School">High School</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="right-column">
                                        <div className="question-text">Degree *</div>
                                        <input type="text" className="edit-box" value={degree} onChange={(e) => setDegree(e.target.value)} required />
                                    </div>
                                    <div className="left-column">
                                        <div className="question-text">Field of Study *</div>
                                        <input type="text" className="edit-box" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} required />
                                    </div>
                                    <div className="right-column">
                                        <div className="question-text">Start Date *</div>
                                        <input 
                                            type="date" 
                                            className="edit-box" 
                                            value={startDate ? startDate.toISOString().substr(0, 10) : ''} 
                                            onChange={(e) => setStartDate(new Date(e.target.value))} 
                                            required 
                                        />
                                    </div>
                                    {!inProgress && (
                                        <div className="left-column">
                                            <div className="question-text">End Date</div>
                                            <input
                                                type="date"
                                                id="endDate"
                                                className="edit-box"
                                                value={endDate ? endDate.toISOString().substr(0, 10) : ''}
                                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                            />
                                        </div>
                                    )}
                                    <div className="left-column">
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
                                    <div className="button-container">
                                        <button className="blue-button" onClick={handleEducation}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="job-stat-box">
                <h2><strong>Education</strong></h2>
                <p>----------------</p>
                <button className="blue-button" onClick={handleEditClickEdu}>
                    <FaPlus className="icon" /> Add New Education
                </button>

                {educationItem.length === 0 ? (
                    <p>No education added yet. Click the button above to add.</p>
                ) : (
                    educationItem.map((edu, index) => (
                        <div key={edu._id} className="experience-item">
                            <div className="personal-info">
                                <p><FaUniversity className="info-icon" /> <strong>Institution:</strong> {edu.institution}</p>
                                <p><FaBook className="info-icon" /> <strong>Institution Type:</strong> {edu.institutionType}</p>
                                <p><FaGraduationCap className="info-icon" /> <strong>Degree:</strong> {edu.degree}</p>
                                <p><FaBook className="info-icon" /> <strong>Field Of Study:</strong> {edu.fieldOfStudy}</p>
                                <p><FaCalendarAlt className="info-icon" /> <strong>Start Date:</strong> {new Date(edu.startDate).toLocaleDateString()}</p>
                                <p><FaCalendarAlt className="info-icon" /> <strong>End Date:</strong> {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}</p>
                                <FaTrash
                                    onClick={() => handleDelete(edu._id, index)}
                                    className="delete-icon"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfEdu;