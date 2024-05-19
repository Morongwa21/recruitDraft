import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/ProRecr.css';

const EducationPage = () => {
    const navigate = useNavigate();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [otherDocuments, setOtherDocuments] = useState([]); // State to hold multiple files

    const handleNextClick = () => {
        setShowSuccessPopup(true);
        // Navigate to '/personalsec' after a brief delay (simulate save)
        setTimeout(() => {
            navigate('/WorkExperience');
        }, 2000); // Change the delay as needed
    };

    const handleWorkExperienceClick = () => {
        navigate('/WorkExperience');
    };

    const handleEducationClick = () => {
        navigate('/EducationPage');
    };

    const handlePersonalInfoClick = () => {
        navigate('/personalinfo');
    };

    const handleOtherDocumentsChange = (e) => {
        const files = e.target.files;
        setOtherDocuments(files);
    };

    return (
        <div>
            <div className="brand-text">IKUSASATECH</div>
            <div className="title-text">CURRICULUM VITAE</div>

            <div className="cv-container">
                <div className="button-container">
                    <button className="yellow-button" onClick={handlePersonalInfoClick}>Personal Info</button>
                    <button className="yellow-button" onClick={handleEducationClick}>Education</button>
                    <button className="yellow-button" onClick={handleWorkExperienceClick}>Work Experience</button>
                </div>

                <div className="info-container">
                    <div className="field-text">Fields with * indicate required</div>

                    {/* Select for Highest Qualification */}
                    <div className="question-text">Highest Qualification</div>
                    <select className="edit-box">
                        <option value="">Select Highest Qualification</option>
                        <option value="PhD">PhD</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Qualification Documents File Upload */}
                    <div className="question-text">Qualification Documents</div>
                    <input type="file" className="edit-box" />

                    {/* Specify Field of Qualification */}
                    <div className="question-text">Specify Field of Qualification</div>
                    <input type="text" className="edit-box" />

                    {/* Add other Documents File Upload */}
                    <div className="question-text">Add other Documents</div>
                    <input type="file" className="edit-box" multiple onChange={handleOtherDocumentsChange} />

                    {/* Name of Institution */}
                    <div className="question-text">Name of Institution</div>
                    <input type="text" className="edit-box" />

                    {/* Status */}
                    <div className="question-text">Status</div>
                    <select className="edit-box">
                        <option value="">Select Status</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Withdrawn">Withdrawn</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Save Button */}
                    <button className="blue-button" onClick={handleNextClick}>
                        Save
                    </button>

                    {/* Success Popup */}
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
