import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/AdminPostCreate.css';

const AdminCreatePost = () => {
    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState({
        jobTitle: '',
        requirements: '',
        salary: '',
        location: '',
        closingDate: ''
    });

    // Update form input values in the state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle click on "CREATE POST" button
    const handleCreatePostClick = () => {
        // Perform form validation before navigating
        if (formData.jobTitle.trim() === '' || formData.requirements.trim() === '') {
            alert('Job title and requirements are required fields.');
            return;
        }

        // Navigate to the "createpost" page when the button is clicked
        navigate('/createpost');

        // Optionally, clear the form data after submission
        setFormData({
            jobTitle: '',
            requirements: '',
            salary: '',
            location: '',
            closingDate: ''
        });
    };

    // Handle click on "VIEW POSTS" button
    const handleViewPostsClick = () => {
        // Navigate to the "viewposts" page to display existing job posts
        navigate('/viewposts');
    };

    return (
        <div className="cv-container">
            <div className="brand-text">IKUSASATECH</div>
            <div className="title-container">
                <div className="title-text">Vacancies Available</div>
            </div>
            <div className="gray-container">
                <div className="buttons-container">
                    <div className="button-column">
                        <button className="yellow-button" onClick={handleViewPostsClick}>
                            VIEW POSTS
                        </button>
                    </div>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="Enter Job Title"
                    />
                </div>
                <div className="input-container">
                    <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        placeholder="Enter Job Requirements"
                        rows={4}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        placeholder="Enter Salary"
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter Job Location"
                    />
                </div>
                <div className="input-container">
                    <input
                        type="date"
                        id="closingDate"
                        name="closingDate"
                        value={formData.closingDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="button-container">
                    <button className="yellow-button" onClick={handleCreatePostClick}>
                        CREATE POST
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminCreatePost;
