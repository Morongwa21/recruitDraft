import React, { useState, useEffect } from 'react';
import './components/JobPosting.css'; // Import CSS for styling
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import logo from './company logo.jpg';

const CreateJob = () => {
    const [title, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [description, setDescription] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [closingDate, setClosingDate] = useState('');
    const [requirements, setRequirements] = useState('');
    const [skills, setSkills] = useState('');
    const [username, setUsername] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchUserDetails();
    }, []);
    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');
            console.log('Fetching details for user ID:', userId);

            const response = await axios.get(`https://recruitment-portal-rl5g.onrender.com/user/${userId}`);
            console.log('User details response:', response);

            if (response.status === 200) {
                setUsername(response.data.username);
                console.log('Username:', response.data.username);
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };
    const handleJobTitleChange = (e) => {
        setJobTitle(e.target.value);
    };

    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };

    const handleWorkExperienceChange = (e) => {
        setWorkExperience(e.target.value);
    };

    const handleEmploymentTypeChange = (e) => {
        setEmploymentType(e.target.value);
    };

    const handleClosingDateChange = (e) => {
        setClosingDate(e.target.value);
    };

    const handleRequirementsChange = (e) => {
        setRequirements(e.target.value);
    };

    const handleSkillsChange = (e) => {
        setSkills(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submitted with the following data:');
        console.log({
            title,
            company,
            location,
            salary,
            description,
            workExperience,
            employmentType,
            closingDate,
            requirements,
            skills
        });


        try {
            const response = await axios.post('https://recruitment-portal-rl5g.onrender.com/jobs', {
                title,
                company,
                location,
                salary,
                description,
                workExperience,
                employmentType,
                closingDate,
                requirements,
                skills
            });

            if (response.status === 201) {
                alert('Job created successfully.');
                navigate('/AdminJobsView');
                // Clear form fields after successful submission
                setJobTitle('');
                setCompany('');
                setLocation('');
                setSalary('');
                setDescription('');
                setWorkExperience('');
                setEmploymentType('');
                setClosingDate('');
                setRequirements('');
                setSkills('');
            } else {
                alert('Failed to create job. Please try again.');
            }
        } catch (error) {
            console.error('Error creating job:', error.message);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleViewPostsClick = () => {
            navigate(-1); 
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/LoginPage');
    };

    const handleChangePassword = () => {
        navigate('/changepassword');
    };
    return (
        <div className="admin-page">
            <header className="admin-header">
                <div className="logo">
                    <img src={logo} alt="Company Logo" />
                </div>
                <div className="user-info" onClick={handleUserInfoClick}>
                    Welcome, {username}
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                            <button onClick={handleChangePassword}>Change Password</button>
                        </div>
                    )}
                </div>            </header>
            <div className="main-content">
                <h2>Job Postings</h2>
                <div className="create-job-container">
                    <section className="job-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="jobTitle">Job Title:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleJobTitleChange}
                                    id="jobTitle"
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Job Description:</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    id="description"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department:</label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={handleCompanyChange}
                                    id="department"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location:</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={handleLocationChange}
                                    id="location"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Salary:</label>
                                <input
                                    value={salary}
                                    onChange={handleSalaryChange}
                                    id="status"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="workExperience">Work Experience:</label>
                                <input
                                    type="text"
                                    value={workExperience}
                                    onChange={handleWorkExperienceChange}
                                    id="workExperience"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="employmentType">Employment Type:</label>
                                <input
                                    type="text"
                                    value={employmentType}
                                    onChange={handleEmploymentTypeChange}
                                    id="employmentType"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="closingDate">Closing Date:</label>
                                <input
                                    type="date"
                                    value={closingDate}
                                    onChange={handleClosingDateChange}
                                    id="closingDate"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="requirements">Requirements:</label>
                                <input
                                    type="text"
                                    value={requirements}
                                    onChange={handleRequirementsChange}
                                    id="requirements"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="skills">Skills:</label>
                                <input
                                    type="text"
                                    value={skills}
                                    onChange={handleSkillsChange}
                                    id="skills"
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="button-container">
                                <button type="submit" className="create-job-btn">Create Job</button>
                                <button className="view-post-btn" onClick={handleViewPostsClick}>View Posts</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};
export default CreateJob;