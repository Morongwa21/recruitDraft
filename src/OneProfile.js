import React, { useState, useEffect } from 'react';
import logo from './company logo.jpg';
import './components/AdminDash.css'; 
import './components/OneProfile.css';
import Prof from './Prof'; 
import ProfEdu from './ProfEdu'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaUserCircle, FaCity, FaEnvelope, FaPhone, FaUser, FaBell, FaBook, FaGraduationCap, FaCalendarAlt,FaBuilding, FaBriefcase, FaClock, FaTasks, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const OneProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [roleDescription, setRoleDescription] = useState('');
  const [otherRoleDescription, setOtherRoleDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [altNumber, setAltNumber] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [disabilityStatus, setDisability] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [Ethnicity, setEthnicity] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [educationItems, setEducationItems] = useState([]);
  const [experienceItems, setExperienceItems] = useState([]);
  const [resume, setResume] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [jobsAvailable, setJobsAvailable] = useState(0);
  const [resumeFileName, setResumeFileName] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showStatusMessage, setShowStatusMessage] = useState(false);
  const [preview, setPreview] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unviewedCount, setUnviewedCount] = useState(0);
  useEffect(() => {
    if (showStatusMessage) {
      const timer = setTimeout(() => setShowStatusMessage(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [showStatusMessage]);
  useEffect(() => {
    fetchUserDetails();
    fetchJobs();
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);
  useEffect(() => {
    const storedResume = localStorage.getItem('resume');
    if (storedResume) {
      setResume(storedResume);
    };
  
  }, []);
  useEffect(() => {
    console.log('Number of jobs available:', jobsAvailable);
    console.log('Length of education items:', educationItems.length);
    console.log('Length of experience items:', experienceItems.length);
  }, [jobsAvailable, educationItems, experienceItems]);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      setResumeFileName(file.name);
    }
  };
  

  const fetchEducationItem = async () => {
    try {
      const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/profile');
      if (response.status === 200) {
        const profile = response.data.profile || {};
        const education = Array.isArray(profile.education) ? profile.education : [];
        setEducationItems(education);
        console.log('edu', education);
      } else {
        console.error('Failed to fetch profile:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching education items:', error.message);
    }
  };
  const fetchExperience = async () => {
    try {
      const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/profile');
      if (response.status === 200) {
        const profile = response.data.profile || {};
        const experience = Array.isArray(profile.experience) ? profile.experience : [];
        console.log('experience------->', response)
        setExperienceItems(experience);
      } else {
        console.error('Failed to fetch profile:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching experience:', error.message);
    }
  };
  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem('userId');
      console.log('Fetching details for user ID:', userId);
  
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
  
      // Update the URL to include userId
      const profileResponse = await axios.get(`https://recruitment-portal-t6a3.onrender.com/profile`);
  
      if (profileResponse.status === 200) {
        const response = profileResponse.data.profile;
        console.log(response);
  
        const {
          roleDescription,
          otherRoleDescription,
          skills,
          firstName,
          lastName,
          cellNumber,
          altNumber,
          citizenship,
          email,
          dateOfBirth,
          gender,
          disabilityStatus,
          resume,
profilePicture,
          location: {
            city = '',
            address = '',
            province = '',
            street = '',
            zipCode = '',
            country = '',
          } = {},
          Ethnicity,
          idNumber,
          experience = [],
          education = [],
        } = response;
  
        setRoleDescription(roleDescription || '');
        setOtherRoleDescription(otherRoleDescription || '');
        setSkills(skills || '');
        setFirstName(firstName || '');
        setLastName(lastName || '');
        setCellNumber(cellNumber || '');
        setAltNumber(altNumber || '');
        setCitizenship(citizenship || '');
        setEmail(email || '');
        setDob(dateOfBirth || '');
        setGender(gender || '');
        setDisability(disabilityStatus || '');
        setCity(city || '');
        setAddress(address || '');
        setProvince(province || '');
        setStreet(street || '');
        setZipCode(zipCode || '');
        setCountry(country || '');
        setEthnicity(Ethnicity || '');
        setIdNumber(idNumber || '');
        setResume(resume || '');
        setProfileImage(profilePicture || ''); 
        setEducationItems(education || []);
        setExperienceItems(experience || []);
      } else {
        console.error('Failed to fetch user details or profile data');
      }
    } catch (error) {
      console.error('Error fetching user details or profile data:', error.message);
    }
  };
  const handleUserInfoClick = (e) => {
    e.stopPropagation();  // Prevent the global click handler from running
    setDropdownVisible(!dropdownVisible);
};

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/jobs');
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
    navigate('/LoginPageA');
  };

 

  const handleImageChange = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      setError('Selected file is not an image');
      return;
    }

    console.log('Selected file details:', {
      Name: selectedFile.name,
      Type: selectedFile.type,
      Size: selectedFile.size,
    });

    try {
      setLoading(true);

      // Convert file to Base64 and display it immediately as a preview
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setProfileImage(base64Image); // Show preview immediately

        // Upload the image to the server
        const response = await axios.patch(
          'https://recruitment-portal-t6a3.onrender.com/profile',
          { profilePicture: base64Image },
          { headers: { 'Content-Type': 'application/json' } }
        );

        console.log('Profile picture response:', response);

        if (response.data.success) {
          const imageURL = response.data.imageURL;
          setProfileImage(imageURL); // Update with final image URL from the server
          localStorage.setItem('profileImage', imageURL); // Save URL from server
          setSuccess('Profile picture updated successfully!');
        } else {
          setError('Failed to update profile picture.');
        }
      };

      reader.readAsDataURL(selectedFile); // Convert to Base64 string
    } catch (error) {
      setError('Error uploading profile picture');
      console.error('Error uploading profile picture:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const calculateProfileCompleteness = () => {
    let completeness = 0;
  
    // Define required fields
    const requiredFields = [
      firstName,
      lastName,
      cellNumber,
      email,
      roleDescription,
      gender,
      citizenship,
      dateOfBirth,
      disabilityStatus,
      address,
      city,
      province,
      zipCode,
      country,
    ];
  
    // Check if optional fields are filled
    const isEducationFilled = educationItems.length > 0;
    const isExperienceFilled = experienceItems.length > 0;
  
    // Count filled required fields
    const filledFieldsCount = requiredFields.filter(field => {
      if (field === undefined || field === null) return false;
      if (typeof field === 'string' && field.trim() === '') return false;
      return true;
    }).length;
  
    // Total number of fields, including optional ones
    const totalFieldsCount = requiredFields.length + 2; // +2 for education and experience
  
    // Total filled fields
    const totalFilledFieldsCount = filledFieldsCount + (isEducationFilled ? 1 : 0) + (isExperienceFilled ? 1 : 0);
  
    // Calculate completeness percentage
    completeness = (totalFilledFieldsCount / totalFieldsCount) * 100;
  
    // Clamp percentage between 0 and 100
    return Math.min(Math.max(completeness, 0), 100).toFixed(2);
  };
  
  const completenessPercentage = calculateProfileCompleteness();
  const progressDeg = (completenessPercentage / 100) * 360;
  
  console.log('Profile progressDeg:', progressDeg);
 
  
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  


  const handleUpload = async () => {
    if (!resume) {
      console.error('No file selected.');
      return;
    }
  
    try {
      const base64Resume = await fileToBase64(resume);
      const formData = {
        resume: base64Resume, // Send the base64 string
      };
  
      console.log('resume:', formData);
      const response = await axios.patch(`https://recruitment-portal-t6a3.onrender.com/profile`, formData, {
        headers: {
          'Content-Type': 'application/json', // Adjust the content type accordingly
        },
      });
  
      if (response.status === 200) {
        console.log('Resume uploaded successfully:', response.data.message);
        setIsSaved(true);
      } else {
        console.error('Failed to upload resume:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error uploading resume:', error.message);
    }
  };
  
  const handleResumeSave = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!resume) {
      console.error('Resume is empty');
      setSaveMessage('Please upload a resume.');
      setLoading(false);
      return;
    }
  
    try {
      const base64Resume = await fileToBase64(resume);
      const payload = {
        resume: base64Resume, // Send the base64 string
      };
  
      console.log('payload:::::::: ', payload);
      const response = await axios.patch(`https://recruitment-portal-t6a3.onrender.com/profile`, payload, {
        headers: {
          'Content-Type': 'application/json', // Adjust the content type accordingly
        },
      });
  
      console.log('Save response:', response);
  
      if (response.status === 200) {
        setSaveMessage('Profile saved successfully.');
        setIsSaved(true);
        localStorage.setItem('resumeFileName', resumeFileName);
      } else {
        setSaveMessage('Failed to save profile.');
      }
    } catch (error) {
      console.error('Error saving profile:', error.message);
      setSaveMessage('An error occurred while saving the profile.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const storedResume = localStorage.getItem('resume');
    if (storedResume) {
      setResume(storedResume); // Assuming storedResume is a base64 string
    }
  
    const storedResumeFileName = localStorage.getItem('resumeFileName');
    if (storedResumeFileName) {
      setResumeFileName(storedResumeFileName);
    }
    fetchEducationItem();
  }, []);
  const handleSaveClick = async() => {
    setLoading(true); 
    setSaveMessage('');
    const userId = localStorage.getItem('userId');
    const data = {
      roleDescription,
      otherRoleDescription,
      skills,
      firstName,
      lastName,
      cellNumber,
      altNumber,
      citizenship,
      email,
      dateOfBirth,
      gender,
      disabilityStatus,
    location: {
        city,
        address,
        province,
        street,
        zipCode,
        country,
      },
      idNumber,
      Ethnicity,
    };
    try {
        let checkProfileResponse;
        try {
          checkProfileResponse = await axios.get(`https://recruitment-portal-t6a3.onrender.com/profile`);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            checkProfileResponse = { status: 404, data: null }; 
          } else {
            throw error; 
          }
        }
        console.log('Existing Profile: ', checkProfileResponse);
        if (checkProfileResponse.status === 200 && checkProfileResponse.data) {
          console.log('data: ', data);
          const updateResponse = await axios.patch('https://recruitment-portal-t6a3.onrender.com/profile', data);
          if (updateResponse.status === 200) {
            console.log('Profile updated successfully');
            setSaveMessage('Profile updated successfully!');
            setIsSaved(true);
            handleCloseModal();
            setShowStatusMessage(true);

          } else {
            setSaveMessage(`Failed to update profile: ${updateResponse.statusText}`);
          }
        } else {
          const createResponse = await axios.post('https://recruitment-portal-t6a3.onrender.com/profile', data);
          if (createResponse.status === 200) {
            console.log('Profile created successfully');
            setIsSaved(true);
            setShowStatusMessage(true);

          } else {
            console.error('Failed to create profile:', createResponse.status, createResponse.statusText);
          }
        }
      } catch (error) {
        setSaveMessage(`Error saving profile: ${error.response ? error.response.data : error.message}`);
      } finally {
        setLoading(false); 
      }
    };
  const ethnicityOptions = [
    'African',
    'Asian',
    'Coloured',
    'White',
    'Indian',
  ];


const handleEditClick = () => {
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);

};
useEffect(() => {
  const fetchNotifications = async () => {
      try {
          const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/notifications');
          setNotifications(response.data);

          // Count unviewed notifications
          const unviewed = response.data.filter(notification => !notification.viewed);
          setUnviewedCount(unviewed.length);
      } catch (error) {
          console.error('Error fetching notifications:', error);
      }
  };

  fetchNotifications();
}, []);
const handleBellClick = (event) => {
  event.stopPropagation();  // Prevent click from triggering other click handlers
  setIsNotificationsOpen(!isNotificationsOpen);
};


// Handle page click to close both dropdowns
const handlePageClick = () => {
    setIsNotificationsOpen(false);
    setDropdownVisible(false);
};
return (
  <div className="admin-page" onClick={handlePageClick}>
      <header className="admin-header">
        <div className="logo">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="user-info">
                    <FaBell className="bell-icon" onClick={handleBellClick} /> 
                    {unviewedCount > 0 && (
                        <span className="notification-count">{unviewedCount}</span>
                    )}

{isNotificationsOpen && (
        <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
            <h3>Notifications</h3>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>
                        <div className="notification-message">
                            {notification.message}
                            {!notification.viewed && <strong> (New)</strong>}
                        </div>
                        <div className="notification-date">
                            {new Date(notification.receivedAt).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
                    )}
                    <FaUser className="user-icon" onClick={handleUserInfoClick} />
                    {dropdownVisible && (
                        <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </header>

      <div className="admin-content">
        <aside className="side">
          <ul>
            <li><a href="/OneProfile">Profile</a></li>
            <li><a href="/IkusasaProgram">Job Listings</a></li> 
            <li><a href="/ViewAJobs">Job Applications</a></li>
            <li><a href="/CVTemplate">Templates</a></li>

          </ul>
        </aside>
        <div className="main-content">
          <h1>My Home</h1>
          <div className="job-stats-container">
            <div className="job-stat-box">
              <p>Number of jobs available in the portal:</p>
              <p style={{ fontSize: '40px', color:'#007bff' }}>{jobsAvailable}</p>
              </div>
              <div className="job-stat-box">
  <div className="profile-completeness">
  <h3 className="profile-completeness-title">Profile Completeness</h3>
  <div className="progress-bar-container">
      <div 
        className="progress-bar-fill" 
        style={{ width: `${completenessPercentage}%` }}
      />
    </div>
    <div className="progress-label">{completenessPercentage}%</div>
  </div>
</div>
</div>

          <p></p>
          <div className="parent-container">
          <div className="jobsekerContainer">
            <div className="jobsekerWrapper">
              <div className="jobsekerLeft">
              <div class="jobsekerBox">

                    <h><strong>Personal Information</strong></h>
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
    {loading ? (
      <div className="loading-spinner">
                            <FaSpinner className="spinner-icon" />
                            <span>Loading...</span>
      </div>
    ) : profileImage ? (
      <img src={profileImage} alt="Profile Icon" className="profile-icon" />
    ) : (
      <FaUserCircle className="profile-icon" />
    )}
  </label>
  {/* {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>} */}
                 


                    <div className="personal-info">
                    {firstName && lastName && (
                      <p><FaUser className="info-icon" /> <strong>Name:</strong> {firstName} {lastName}</p>
                    )}
                    {city && (
                      <p><FaCity className="info-icon" /> <strong>City:</strong> {city}</p>
                    )}
                    {email && (
                      <p><FaEnvelope className="info-icon" /> <strong>Email:</strong> {email}</p>
                    )}
                    {cellNumber && (
                      <p><FaPhone className="info-icon" /> <strong>Phone Number:</strong> {cellNumber}</p>
                    )}
                  </div>
                    <FaEdit className="edit-icon" onClick={handleEditClick} />
      </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
          {loading && (
              <div className="spinner-overlay">
                <div className="spinner"></div>
              </div>
            )}
            <div className="modal-header">
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
            <h1><strong>Personal Details</strong></h1>

                <div className="form-container">
  <div className="row">
    <div className="left-column">
      <div className="question-text">First Name *</div>
      <input type="text" className="edit-box" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
    </div>
    <div className="right-column">
      <div className="question-text">Last Name *</div>
      <input type="text" className="edit-box" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
    </div>
  </div>
  <div className="row">
    <div className="left-column">
      <div className="question-text">Cell Number *</div>
      <input type="text" className="edit-box" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} required />
    </div>
    <div className="right-column">
      <div className="question-text">Alternative Number</div>
      <input type="text" className="edit-box" value={altNumber} onChange={(e) => setAltNumber(e.target.value)} />
    </div>
  </div>
  <div className="row">
    {/* <div className="left-column">
      <div className="question-text">Email *</div>
      <input type="email" className="edit-box" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div> */}
    <div className="right-column">
      <div className="question-text">Which role best describes you?</div>
      <select className="edit-box" value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} required>
        <option value="">Select Role</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
        <option value="analyst">Analyst</option>
        <option value="other">Other</option>
      </select>
      {roleDescription === 'other' && (
        <div className="question-text">
          <input type="text" className="edit-box" value={otherRoleDescription} onChange={(e) => setOtherRoleDescription(e.target.value)} placeholder="Please specify" required />
        </div>
      )}
    </div>
  </div>
  <div className="row">
    <div className="right-column">
      <div className="question-text">Professional Skills</div>
      <input type="text" className="edit-box" value={skills} onChange={(e) => setSkills(e.target.value)} />
    </div>
    <div className="left-column">
      <div className="question-text">Gender *</div>
      <select className="edit-box" value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>
  <div className="row">
    <div className="right-column">
      <div className="question-text">Citizenship *</div>
      <input type="text" className="edit-box" value={citizenship} onChange={(e) => setCitizenship(e.target.value)} required />
    </div>
    <div className="right-column">
      <div className="question-text">ID/Passport Number *</div>
      <input type="text" className="edit-box" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
    </div>
  </div>
  <div className="row">
    <div className="left-column">
      <div className="question-text">Date of Birth *</div>
      <input type="date" className="edit-box" value={dateOfBirth} onChange={(e) => setDob(e.target.value)} required />
    </div>
    <div className="left-column">
      <div className="question-text">Disability Status *</div>
      <select className="edit-box" value={disabilityStatus} onChange={(e) => setDisability(e.target.value)} required>
        <option value="">Select Disability</option>
        <option value="none">None</option>
        <option value="physical">Physical Disability</option>
        <option value="visual">Visual Impairment</option>
        <option value="hearing">Hearing Impairment</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>
  <div className="row">
    <div className="right-column">
      <div className="question-text">Ethnicity *</div>
      <select className="edit-box" value={Ethnicity} onChange={(e) => setEthnicity(e.target.value)} required>
        <option value="">Select Ethnicity</option>
        {ethnicityOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
    <div className="left-column">
      <div className="question-text">Home Address *</div>
      <input type="text" className="edit-box" value={address} onChange={(e) => setAddress(e.target.value)} required />
    </div>
    </div>
    <div className="row">
    <div className="right-column">
      <div className="question-text">Street</div>
      <input type="text" className="edit-box" value={street} onChange={(e) => setStreet(e.target.value)} />
    </div>
    <div className="left-column">
      <div className="question-text">City *</div>
      <input type="text" className="edit-box" value={city} onChange={(e) => setCity(e.target.value)} required />
    </div>
    </div>
    <div className="row">
    <div className="right-column">
      <div className="question-text">Province *</div>
      <select className="edit-box" value={province} onChange={(e) => setProvince(e.target.value)} required>
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
      <div className="question-text">Zip Code *</div>
      <input type="text" className="edit-box" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
    </div>
    </div>
    <div className="row">
    <div className="left-column">
      <div className="question-text">Country *</div>
      <input type="text" className="edit-box" value={country} onChange={(e) => setCountry(e.target.value)} required />
    </div>
  </div>
  <div className="button-container">
    <button className="blue-button" onClick={handleSaveClick}>Save</button>
  </div>
</div>
</div>
</div>
</div>
   )}
       <Prof />

   </div>
</div> 
              <div className="jobsekerRight">
      <div className="jobsekerBox">
      <h2>Resume</h2>
      <div>
      <input type="file" onChange={handleFileChange} />
<div className="button-container">
<button className="blue-button" onClick={handleResumeSave} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button></div>
</div>
{resume && (
<div>
<p>{resumeFileName || 'No file selected'}</p>
        <a href={resume} target="_blank" rel="noopener noreferrer">
          View Resume
  </a>
</div>
      )}
    </div>
<ProfEdu />
</div>
                  </div>
                </div>
                </div>
            </div>
        </div>
      );
  };
export default OneProfile;