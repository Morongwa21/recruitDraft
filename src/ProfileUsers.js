import React, { useState, useEffect } from 'react';import logo from './company logo.jpg';
import './components/AdminDash.css'; // Create a separate CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { FaEdit, FaUserCircle } from 'react-icons/fa';


const ProfileUsers = () => {
  const [username, setUsername] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null); 

  const navigate = useNavigate();
    const [jobsAvailable, setJobsAvailable] = useState(0);
    const jobsShortlisted = 0;

    useEffect(() => {
      fetchUserDetails();
      fetchJobs();
      const storedImage = localStorage.getItem('profileImage');
      if (storedImage) {
        setProfileImage(storedImage);
      }
  }, []);

  useEffect(() => {
    console.log('Number of jobs available:', jobsAvailable);
  }, [jobsAvailable]);

    const fetchUserDetails = async () => {
    
      try {
          // Fetch user details using stored user ID
          const userId = localStorage.getItem('userId');
          console.log('Fetching details for user ID:', userId);
          const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
          const profileResponse = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
          console.log('Profile response:', profileResponse); 
          console.log('User details response:', response);

          if (response.status === 200 && profileResponse.status === 200) {
            setUsername(response.data.username);
            setProfileData(profileResponse.data); // Set the profile data
          } else {
            console.error('Failed to fetch user details or profile data');
          }
        } catch (error) {
          console.error('Error fetching user details or profile data:', error.message);
        }
      };
  const fetchJobs = async () => {
    try {
        const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/jobs');
        console.log('Jobs response:', response);

        if (response.status === 200) {
            const jobs = response.data;
            setJobsAvailable(jobs.length);
            console.log('Number of jobs available:', jobs.length);

        } else {
            console.error('Failed to fetch jobs');
        }
    } catch (error) {
        console.error('Error fetching jobs:', error.message);
    }
};
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/login');
  };

  const handleUserInfoClick = () => {
    setDropdownVisible(!dropdownVisible);
};



const handleImageChange = (event) => {
  const userId = localStorage.getItem('userId');
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setProfileImage(imageData);
      localStorage.setItem(`profileImage-${userId}`, imageData); // Save image data to localStorage with user ID
    };
    reader.readAsDataURL(event.target.files[0]);
  }
};

const handleEditProfile = () => {
    navigate('/ProfileUpdate'); // Navigate to the ProfileEdit page
  };
  const handleCreateProfile = () => {
    navigate('/LoginPage'); // Navigate to the ProfileCreate page
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
          <h1>My Home</h1>
          <div className="job-stats-container">
            <div className="job-stat-box">
              <p>Number of jobs available in the portal:</p>
              <p>{jobsAvailable}</p>
            </div>
            <div className="job-stat-box">
              <p>Number of jobs you are shortlisted for:</p>
              <p>{jobsShortlisted}</p>
            </div>
          </div>
          <p></p>
          <div className="jobsekerContainer">
            <div className="jobsekerWrapper">
              <div className="jobsekerLeft">
                <div className="jobsekerBox">
                <p><strong>Profile Summary</strong></p>
                  {profileData ? (
                    <div className="profile-summary">
                      <p><strong>First Name:</strong> {profileData.firstName}</p>
                      <p><strong>Last Name:</strong> {profileData.lastName}</p>
                      <p><strong>Email:</strong> {profileData.email}</p>
                      <p><strong>Cell Number:</strong> {profileData.cellNumber}</p>
                      <p><strong>Citizenship:</strong> {profileData.citizenship}</p>
                      <p><strong>Date of Birth:</strong> {new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                      <p><strong>Gender:</strong> {profileData.gender}</p>
                      <p><strong>Disability Status:</strong> {profileData.disabilityStatus}</p>
                      <p><strong>Skills:</strong> {profileData.skills.join(', ')}</p>
                    </div>
                  ) : (
                    <div>
                      <p>No profile available for this user.</p>
                      <button className="edit-profile-btn" onClick={handleCreateProfile}>
                        Create Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
        <div class="jobsekerRight">
            <div class="jobsekerBox">

                
            <button className="edit-profile-btn" onClick={handleEditProfile}>
                    <FaEdit /> Edit Profile
                  </button>
                  <div className="profile-icon-wrapper">
                    <p>Click the icon to upload a picture:</p>
                    <input
                      type="file"
                      id="profile-upload"
                      className="profile-upload-input"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <label
                      htmlFor="profile-upload"
                      className="profile-icon-label"
                      style={{ cursor: 'pointer' }}
                    >
                      {profileImage ? (
                        <img src={profileImage} alt="Profile Icon" className="profile-icon" />
                      ) : (
                        <FaUserCircle className="profile-icon" />
                      )}
                    </label>
                  </div>
                </div>
           
            <div class="jobsekerBox">
     
            </div>
        </div>
    </div>
 
    
    
 
</div>

            </div>
          </div>
        </div>
      );
  };
  

export default ProfileUsers;
