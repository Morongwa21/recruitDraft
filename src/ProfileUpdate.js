import React, { useState, useEffect } from 'react';
import logo from './company logo.jpg'; 
import './components/AdminDash.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileUpdate = () => {
    const [username, setUsername] = useState(""); 
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [profileData, setProfileData] = useState({
        roleDescription: '',
        otherRoleDescription: '',
        skills: '',
        firstName: '',
        lastName: '',
        cellNumber: '',
        altNumber: '',
        citizenship: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        disabilityStatus: '',
        city: '',
        address: '',
        province: '',
        street: '',
        zipCode: '',
        country: '',
        Ethnicity: '',
        idNumber: ''
    });
    const [resume, setCvFile] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [userData, setUserData] = useState({}); 
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
    }, []);
  
    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');
            console.log('Fetching details for user ID:', userId);
          
            const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
            const profileResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/profile`);

            console.log('Profile details response:', profileResponse);
            console.log('User details response:', response); 

            if (response.status === 200 && profileResponse.status === 200) {
                const userData = response.data;
                const profileData = profileResponse.data;
                console.log('User data:', userData);
                console.log('Profile data:', profileData);
                setProfileData(profileData);
                setUserData(userData); // Set userData state
                setUsername(userData.username); // Set username state if necessary
            } else {
                console.error('Failed to fetch profile details');
            }
        } catch (error) {
            console.error('Error fetching profile details:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setCvFile(e.target.files[0]);
        } else {
            setCvFile(null);
        }
    };

    const handleUpdateProfile = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }
    
        const formData = new FormData();
        formData.append('userId', userId); // Add userId to the formData if necessary
        formData.append('firstName', profileData.firstName);
        formData.append('lastName', profileData.lastName);
        formData.append('cellNumber', profileData.cellNumber);
        formData.append('altNumber', profileData.altNumber);
        formData.append('citizenship', profileData.citizenship);
        formData.append('email', profileData.email);
        formData.append('dateOfBirth', profileData.dateOfBirth);
        formData.append('gender', profileData.gender);
        formData.append('disabilityStatus', profileData.disabilityStatus);
        formData.append('city', profileData.city);
        formData.append('address', profileData.address);
        formData.append('province', profileData.province);
        formData.append('street', profileData.street);
        formData.append('zipCode', profileData.zipCode);
        formData.append('country', profileData.country);
        formData.append('ethnicity', profileData.ethnicity);
        formData.append('idNumber', profileData.idNumber);
        formData.append('roleDescription', profileData.roleDescription);
        formData.append('otherRoleDescription', profileData.otherRoleDescription);
        formData.append('skills', profileData.skills);
        if (resume) {
            formData.append('resume', resume);
        }
    
        try {
            const response = await axios.patch(
                `https://recruitment-portal-l0n5.onrender.com/profile`, // Update the URL accordingly
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
    
            if (response.status === 200) {
                console.log('Response:', response);
                setShowPopup(true);
                alert('Profile has been Updated successfully');
                  navigate('/EducationUpdate');
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/LoginPage'); // Make sure '/login' is the correct route for your login page
    };

    const ethnicityOptions = [
        'African',
        'Asian',
        'Coloured',
        'White',
        'Indian',
    ];

    return (
        <div className="admin-page">
            <header className="admin-header">
                <div className="logo">
                    <img src={logo} alt="Company Logo" />
                </div>
                <div className="user-info" onClick={handleUserInfoClick}>
                    Welcome, {username} {/* Use username state here */}
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </header>
            <div className="admin-content">
                <aside className="side">
                    <ul>
                         {/* <li><a href="#home">Home</a></li> */}
            <li><a href="/ProfileUsers">Profile</a></li>
            <li><a href="/ViewPosts">Documents</a></li>
            <li><a href="/IkusasaProgram">Job Listings</a></li> 
            <li><a href="/ViewAJobs">Job Applications</a></li>
            <li><a href="/ApplicationTemplates">Templates</a></li>
                    </ul>
                </aside>


                <div className="main-content">
             
                  

                    <div className="button-container">
                        <button className="red-button" onClick={() => navigate('/ProfileUpdate')}>Personal Info</button>
                        <button className="red-button" onClick={() => navigate('/EducationUpdate')}>Education</button>
                        <button className="red-button" onClick={() => navigate('/WorkExperience')}>Work Experience</button>
                    </div>
                    <div className="field-text">Fields with * indicate required</div>
                    <div className="left-column">
                        <div className="question-text">First Name *</div>
                        <input type="text" name="firstName" className="edit-box" value={profileData.firstName} onChange={handleInputChange}  />
                    </div>
                    <div className="right-column">
                        <div className="question-text">Last Name *</div>
                        <input type="text" name="lastName" className="edit-box" value={profileData.lastName} onChange={handleInputChange}  />
                    </div>
                    <div className="left-column">
                        <div className="question-text">Cell Number *</div>
                        <input type="text" name="cellNumber" className="edit-box" value={profileData.cellNumber} onChange={handleInputChange}  />
                    </div>
                    <div className="right-column">
                        <div className="question-text">Alternative Number</div>
                        <input type="text" name="altNumber" className="edit-box" value={profileData.altNumber} onChange={handleInputChange} />
                    </div>
                    <div className="left-column">
                        <div className="question-text">Email *</div>
                        <input type="email" name="email" className="edit-box" value={profileData.email} onChange={handleInputChange}  />
                    </div>
                    <div className="right-column">
                        <div className="question-text">Which role best describes you?</div>
                        <select name="roleDescription" className="edit-box" value={profileData.roleDescription} onChange={handleInputChange} >
                            <option value="">Select Role</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="manager">Manager</option>
                            <option value="analyst">Analyst</option>
                            <option value="other">Other</option>
                        </select>
                        {profileData.roleDescription === 'other' && (
                            <div className="question-text">
                                <input type="text" name="otherRoleDescription" className="edit-box" value={profileData.otherRoleDescription} onChange={handleInputChange} placeholder="Please specify"  />
                            </div>
                        )}
                    </div>
                    <div className="right-column">
                        <div className="question-text">Professional Skills</div>
                        <input type="text" name="skills" className="edit-box" value={profileData.skills} onChange={handleInputChange} />
                    </div>
                    <div className="left-column">
                        <div className="question-text">Gender</div>
                        <select name="gender" className="edit-box" value={profileData.gender} onChange={handleInputChange} >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="right-column">
                        <div className="question-text">Citizenship</div>
                        <input type="text" name="citizenship" className="edit-box" value={profileData.citizenship} onChange={handleInputChange}  />
                    </div>
                    <div className="right-column">
                        <div className="question-text">ID/Passport Number</div>
                        <input type="text" name="idNumber" className="edit-box" value={profileData.idNumber} onChange={handleInputChange} />
                    </div>
                    <div className="left-column">
                        <div className="question-text">Date of Birth</div>
                        <input type="date" name="dateOfBirth" className="edit-box" value={profileData.dateOfBirth} onChange={handleInputChange}  />
                    </div>
                    <div className="left-column">
                        <div className="question-text">Disability Status</div>
                        <select name="disabilityStatus" className="edit-box" value={profileData.disabilityStatus} onChange={handleInputChange} >
                            <option value="">Select Disability</option>
                            <option value="none">None</option>
                            <option value="physical">Physical Disability</option>
                            <option value="visual">Visual Impairment</option>
                            <option value="hearing">Hearing Impairment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="left-column">
                        <div className="question-text">Ethnicity</div>
                        <select name="ethnicity" className="edit-box" value={profileData.ethnicity} onChange={handleInputChange} >
                            <option value="">Select Ethnicity</option>
                            {ethnicityOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="left-column">
                        <div className="question-text">Home Address </div>
                        <input type="text" name="address" className="edit-box" value={profileData.address} onChange={handleInputChange}  />
                    </div>
                    <div className="right-column">
                        <div className="question-text">Street</div>
                        <input type="text" name="street" className="edit-box" value={profileData.street} onChange={handleInputChange} />
                    </div>
                    <div className="left-column">
                        <div className="question-text">City</div>
                        <input type="text" name="city" className="edit-box" value={profileData.city} onChange={handleInputChange}  />
                    </div>
                    <div className="right-column">
                        <div className="question-text">Province</div>
                        <select name="province" className="edit-box" value={profileData.province} onChange={handleInputChange} >
                            <option value="">Select Province</option>
                            <option value="Eastern Cape">Eastern Cape</option>
                            <option value="Free State">Free State</option>
                            <option value="Gauteng">Gauteng</option>
                            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                            <option value="Limpopo">Limpopo</option>
                            <option value="Mpumalanga">Mpumalanga</option>
                            <option value="North West">North West</option>
                            <option value="Northern Cape">Northern Cape</option>
                            <option value="Western Cape">Western Cape</option>
                        </select>
                    </div>
                    <div className="left-column">
                        <div className="question-text">Zip Code</div>
                        <input type="text" name="zipCode" className="edit-box" value={profileData.zipCode} onChange={handleInputChange}  />
                    </div>
                    <div className="left-column">
                        <div className="question-text">Country</div>
                        <input type="text" name="country" className="edit-box" value={profileData.country} onChange={handleInputChange}  />
                    </div>
                    <div className="button-container">
                        <button className="blue-button" onClick={handleUpdateProfile}>Update</button>
                    </div>
                  
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;
