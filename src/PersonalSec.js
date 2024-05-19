import React, { useState } from 'react';
//import './components/PersonalSec.css';
import './components/ProRecr.css';

import { useNavigate } from 'react-router-dom';

const PersonalSec = () => {
    const [cvFile, setCvFile] = useState(null);
    const [isSaved, setIsSaved] = useState(false); // State to track whether data is saved
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [province, setProvince] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCvFile(file);
    };

    const handleWorkExperienceClick = () => {
        navigate('/WorkExperience'); // Use navigate function to redirect to '/personalsec'
    };
    const handleEducationClick = () => {
        // Navigate to the '/education' route when Education button is clicked
        navigate('/EducationPage');
    };
    const handlePersonalInfoClick = () => {
        // Navigate to the '/education' route when Education button is clicked
        navigate('/personalinfo');
    };


    const handleSaveClick = () => {
        // Check if all required fields are filled
        if (city && address && province && street && zipCode && country) {
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
            }, 2000);
        } else {
            alert('Please fill out all required fields.');
        }
    };

    const isSaveDisabled = !(city && address && province && street && zipCode && country);

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

                    <div className="question-text">CV *</div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf, .doc, .docx"
                        className="edit-box"
                    />

                    <div className="question-text">City *</div>
                    <input
                        type="text"
                        className="edit-box"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />

                    <div className="question-text">Address *</div>
                    <input
                        type="text"
                        className="edit-box"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />

                    <div className="question-text">Province *</div>
                    <input
                        type="text"
                        className="edit-box"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                    />

                    <div className="question-text">Street *</div>
                    <input
                        type="text"
                        className="edit-box"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />

                    <div className="question-text">Zip Code *</div>
                    <input
                        type="text"
                        className="edit-box"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                    />

                    <div className="question-text">Country *</div>
                    <input
                        type="text"
                        className="edit-box"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />

                    <button className="blue-button" onClick={handleSaveClick} disabled={isSaveDisabled}>
                        Save
                    </button>

                    {/* Conditional Popup */}
                    {isSaved && (
                        <div className="popup">
                            Personal Information Saved Successfully!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalSec;