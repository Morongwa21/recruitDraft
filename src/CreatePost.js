import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/PersonalInfoPage.css';

const CreatePost = () => {
    const navigate = useNavigate();
    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [requirements, setRequirements] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [closingDate, setClosingDate] = useState('');

    const handleNextClick = () => {
        navigate('/personalsec');
    };

    return (
        <div className="cv-container">
            <div className="brand-text">IKUSASATECH</div>
            <div className="title-container">
                <div className="title-text">CURRICULUM VITAE</div>
            </div>
            <div className="gray-container">
                <div className="buttons-container">
                    <button className="yellow-button">VIEW POSTS</button>
                    <button className="yellow-button">CREATE POST</button>
                </div>
                <div className="form-container">
                    <div className="details-columns">
                        <div className="left-column">
                            <div className="question-text">Job Title</div>
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                className="edit-box"
                            />
                            <div className="question-text">Requirements</div>
                            <input
                                type="text"
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                                className="edit-box"
                            />
                            <div className="question-text">Location</div>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="edit-box"
                            />
                        </div>
                        <div className="right-column">
                            <div className="question-text">Description</div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="edit-box"
                            />
                            <div className="question-text">Work Experience</div>
                            <input
                                type="text"
                                value={workExperience}
                                onChange={(e) => setWorkExperience(e.target.value)}
                                className="edit-box"
                            />
                            <div className="question-text">Salary</div>
                            <input
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="edit-box"
                            />
                            <div className="question-text">Closing Date</div>
                            <input
                                type="date"
                                value={closingDate}
                                onChange={(e) => setClosingDate(e.target.value)}
                                className="edit-box"
                            />
                        </div>
                    </div>
                </div>
                <button className="blue-button" onClick={handleNextClick}>
                    Post
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
