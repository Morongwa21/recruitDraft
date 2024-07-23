import React from 'react';
import './components/JobPosting.css'; // Import CSS for styling
import axios from 'axios'; // Import Axios for making HTTP requests
import { Link, useNavigate } from 'react-router-dom';
import logo from './company logo.jpg';

const AdminCPost = () => {
    const navigate = useNavigate();

    const handleViewPosts = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="admin-page">
            <header className="admin-header">
                <div className="logo">
                    <img src={logo} alt="Company Logo" />
                </div>
                <div className="user-info">Welcome, {}</div>
            </header>

            <div className="admin-main-content">
                <h1>Create New Post</h1>
                {/* Form fields go here */}
                <form>
                    {/* Your form fields go here */}
                </form>
                <div className="button-container">
                    <button className="submit-button">Submit</button>
                    <button className="view-posts-button" onClick={handleViewPosts}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default AdminCPost;
