// 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/ProRecr.css';

const ProRecr = () => {
    const navigate = useNavigate();
    const [attendedProgram, setAttendedProgram] = useState(''); // State to track dropdown value
    const [roleDescription, setRoleDescription] = useState(''); // State to track role description
    const [professionalSkills, setProfessionalSkills] = useState(''); // State to track professional skills

    const handleEducationClick = () => {
        navigate('/EducationPage');
    };

    const handleNextClick = () => {
        navigate('/personalinfo');
    };

    const handleWorkExperienceClick = () => {
        navigate('/WorkExperience');
    };

    const handleDropdownChange = (e) => {
        setAttendedProgram(e.target.value);
    };

    const handleRoleDescriptionChange = (e) => {
        setRoleDescription(e.target.value);
    };

    const handleProfessionalSkillsChange = (e) => {
        setProfessionalSkills(e.target.value);
    };

    return (
        <div>
            <div className="brand-text">IKUSASATECH</div>
            <div className="title-text">CURRICULUM VITAE</div>

            <div className="cv-container">
                <div className="button-container">
                    <button className="yellow-button" onClick={handleNextClick}>Personal Info</button>
                    <button className="yellow-button" onClick={handleEducationClick}>Education</button>
                    <button className="yellow-button" onClick={handleWorkExperienceClick}>Work Experience</button>
                </div>

                <div className="info-container">
                    <div className="field-text">Fields with * indicate required</div>

                    <div className="question-text">
                        Have you ever attended an Ikusasa program before?
                    </div>
                    <select className="edit-box" value={attendedProgram} onChange={handleDropdownChange}>
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <div className="question-text">Which role best describes you?</div>
                    <input
                        type="text"
                        className="edit-box"
                        value={roleDescription}
                        onChange={handleRoleDescriptionChange}
                    />

                    <div className="question-text">Professional Skills</div>
                    <input
                        type="text"
                        className="edit-box"
                        value={professionalSkills}
                        onChange={handleProfessionalSkillsChange}
                    />

                    <button className="blue-button" onClick={handleNextClick}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default ProRecr;
