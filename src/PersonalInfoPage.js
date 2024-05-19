import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/ProRecr.css';

const PersonalInfoPage = () => {
    const navigate = useNavigate();
    const [dob, setDob] = useState(''); // State for date of birth
    const [gender, setGender] = useState('');
    const [disability, setDisability] = useState('');
    const [attendedIkusasa, setAttendedIkusasa] = useState('');

    const handleEducationClick = () => {
        navigate('/EducationPage');
    };

    const handleNextClick = () => {
        navigate('/PersonalSec');
    };

    const handleWorkExperienceClick = () => {
        navigate('/WorkExperience');
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
                        <label htmlFor="fullName">Full Name:</label>
                        <input type="text" id="fullName" className="edit-box" required />
                    </div>

                    <div className="question-text">
                        <label htmlFor="cellNumber">Cell Number:</label>
                        <input type="text" id="cellNumber" className="edit-box" required />
                    </div>

                    <div className="question-text">
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            className="edit-box"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="question-text">
                        <label htmlFor="altNumber">Alternative Number:</label>
                        <input type="text" id="altNumber" className="edit-box" />
                    </div>

                    <div className="question-text">
                        <label htmlFor="citizenship">Citizenship:</label>
                        <input type="text" id="citizenship" className="edit-box" required />
                    </div>

                    <div className="question-text">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" className="edit-box" required />
                    </div>

                    <div className="question-text">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            className="edit-box"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>

                    <div className="question-text">
                        <label htmlFor="disability">Disability:</label>
                        <select
                            id="disability"
                            className="edit-box"
                            value={disability}
                            onChange={(e) => setDisability(e.target.value)}
                            required
                        >
                            <option value="">Select Disability</option>
                            <option value="none">None</option>
                            <option value="physical">Physical Disability</option>
                            <option value="visual">Visual Impairment</option>
                            <option value="hearing">Hearing Impairment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="question-text">
                        <label htmlFor="attendedIkusasa">Have you ever attended an Ikusasa program before?</label>
                        <select
                            id="attendedIkusasa"
                            className="edit-box"
                            value={attendedIkusasa}
                            onChange={(e) => setAttendedIkusasa(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <button className="blue-button" onClick={handleNextClick}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoPage;
