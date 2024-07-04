import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/UserProfile.css';

const UserProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
                console.log('Profile data:', response.data); // Add this line for debugging
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };
    
        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profileData) {
        return <div>No profile data found.</div>;
    }

    // Destructure profileData object to get individual fields
    const {
        firstName,
        lastName,
        cellNumber,
        altNumber,
        citizenship,
        email,
        dateOfBirth,
        gender,
        disabilityStatus,
        skills,
        status,
        position,
        otherDocuments,
        experience,
        education,
        resume,
    } = profileData;

    // Render the retrieved profile data
    return (
        <div className="profile-page">
            <h1 className="profile-heading">User Profile</h1>
            <p className="profile-field">First Name: {firstName}</p>
            <p className="profile-field">Last Name: {lastName}</p>
            <p className="profile-field">Cell Number: {cellNumber}</p>
            <p className="profile-field">Alternate Number: {altNumber}</p>
            <p className="profile-field">Citizenship: {citizenship}</p>
            <p className="profile-field">Email: {email}</p>
            <p className="profile-field">Date of Birth: {new Date(dateOfBirth).toLocaleDateString()}</p>
            <p className="profile-field">Gender: {gender}</p>
            <p className="profile-field">Disability Status: {disabilityStatus}</p>
            <p className="profile-field">Skills: {skills.join(', ')}</p>
            <p className="profile-field">Status: {status}</p>
            <p className="profile-field">Position: {position}</p>
            {otherDocuments && otherDocuments.length > 0 && (
                <div className="profile-field">
                    <p>Other Documents:</p>
                    <ul className="profile-list">
                        {otherDocuments.map((doc, index) => (
                            <li key={index} className="profile-list-item">
                                <a href={`/path/to/documents/${doc}`} target="_blank" rel="noopener noreferrer">{doc}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {experience && experience.length > 0 && (
                <div className="profile-field">
                    <p>Experience:</p>
                    <ul className="profile-list">
                        {experience.map((exp, index) => (
                            <li key={index} className="profile-list-item">
                                <p>Company: {exp.company}</p>
                                <p>Position: {exp.position}</p>
                                <p>Responsibilities: {exp.responsibilities}</p>
                                <p>Start Date: {new Date(exp.startDate).toLocaleDateString()}</p>
                                <p>End Date: {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {education && education.length > 0 && (
                <div className="profile-field">
                    <p>Education:</p>
                    <ul className="profile-list">
                        {education.map((edu, index) => (
                            <li key={index} className="profile-list-item">
                                <p>Degree: {edu.degree}</p>
                                <p>Field of Study: {edu.fieldOfStudy}</p>
                                <p>Institution: {edu.institution}</p>
                                <p>Status: {edu.status}</p>
                                <p>End Date: {new Date(edu.endDate).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <p className="profile-field">Resume: <a href={`/path/to/resumes/${resume}`} target="_blank" rel="noopener noreferrer">{resume}</a></p>
        </div>
    );
};

export default UserProfile;