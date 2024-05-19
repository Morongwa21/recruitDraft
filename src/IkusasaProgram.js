import React from 'react';
import { useNavigate } from 'react-router-dom';
import './components/IkusasaProgram.css';

const IkusasaProgram = () => {
    const navigate = useNavigate();

    const handleEducationClick = () => {
        navigate('/EducationPage');
    };

    const handleNextClick = () => {
        navigate('/personalinfo');
    };

    const handleWorkExperienceClick = () => {
        navigate('/WorkExperience');
    };

    return (
        <div className="cv-container">
            <div className="brand-text">IKUSASATECH</div>
            <div className="title-container">
                <div className="title-text">CURRICULUM VITAE</div>
            </div>

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
                <input type="text" className="edit-box" />

                <div className="question-text">Which role best describes you?</div>
                <input type="text" className="edit-box" />
                <div className="question-text">Professional Skills</div>
                <input type="text" className="edit-box" />

                <button className="blue-button" onClick={handleNextClick}>Next</button>
            </div>
        </div>
    );
};

export default IkusasaProgram;
