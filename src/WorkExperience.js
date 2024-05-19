import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './components/PersonalSec.css';

//import './components/PersonalInfoPage.css';

const WorkExperience = () => {
    const navigate = useNavigate();
    const [hasExperience, setHasExperience] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [status, setStatus] = useState(null);
    const [responsibility, setResponsibility] = useState('');

    const handleNextClick = () => {
        navigate('/personalsec');
    };

    const handleExperienceChange = (e) => {
        setHasExperience(e.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
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

    const handleViewPost = () => {
        navigate('/ViewPost');
    };

    return (
        <div>
            <div className="brand-text">IKUSASATECH</div>
            <div className="title-text">CURRICULUM VITAE</div>

            <div className="cv-container">
                <div className="buttons-container">
                    <div className="button-column">
                    <button className="yellow-button small" onClick={handleViewPost}>VIEW POSTS</button>
                    </div>
                </div>
                <div className="info-container">
                    <div className="field-text">Fields with * indicate required</div>
                    <div className="question-text">Do you have any working experience?</div>
                    <select className="edit-box" value={hasExperience} onChange={handleExperienceChange}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {hasExperience === 'Yes' && (
                        <div className="form-columns">
                            <div className="form-column">
                                <div className="question-text">Company</div>
                                <input type="text" className="edit-box" />
                            </div>
                            <div className="form-column">
                                <div className="question-text">Position</div>
                                <input type="text" className="edit-box" />
                            </div>
                            <div className="form-column">
                                <div className="question-text">Responsibility</div>
                                <Select
                                    options={responsibilityOptions}
                                    value={responsibility}
                                    onChange={(selectedOption) => setResponsibility(selectedOption)}
                                    className="edit-box"
                                    placeholder="Select Responsibility"
                                    isMulti
                                />
                            </div>
                            <div className="form-column">
                                <div className="question-text">Start Date</div>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    className="edit-box"
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
                    )}
                    <button className="blue-button" onClick={handleNextClick}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkExperience;