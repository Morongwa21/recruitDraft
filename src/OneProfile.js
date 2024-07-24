import React, { useState, useEffect } from 'react';
import logo from './company logo.jpg';
import './components/AdminDash.css'; 
import './components/OneProfile.css'; 
import Prof from './Prof'; 
import ProfEdu from './ProfEdu'; 

import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaUserCircle, FaTrash, FaPlus, FaCity, FaEnvelope, FaPhone, FaUser, FaUniversity, FaBook, FaGraduationCap, FaCalendarAlt,FaBuilding, FaBriefcase, FaClock, FaTasks, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const OneProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdu, setIsModalOpenEdu] = useState(false);
  const [isModalOpenExp, setIsModalOpenExp] = useState(false);

  const [username, setUsername] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  // const [profileData, setProfileData] = useState(null);
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
  const [employmentType, setEmploymentType] = useState('');
  const [responsibilities, setResponsibilities] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [institutionType, setInstitutionType] = useState('');
  const [educationItem, setEducationItems] = useState([]);
  const [experienceItems, setExperienceItems] = useState([]);
  const [resume, setResume] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [jobsAvailable, setJobsAvailable] = useState(0);

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
    fetchEducationItem();
  }, []);
  useEffect(() => {
    console.log('Number of jobs available:', jobsAvailable);
    console.log('Length of education items:', educationItem.length);
    console.log('Length of experience items:', experienceItems.length);
  }, [jobsAvailable, educationItem, experienceItems]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        localStorage.setItem('resume', e.target.result); // Store file as Base64 string
        setResume(file);
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const fetchEducationItem = async () => {
    try {
      const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
      if (response.status === 200) {
        const profile = response.data.profile || {};
        const education = Array.isArray(profile.education) ? profile.education : [];
        setEducationItems(education);
      } else {
        console.error('Failed to fetch profile:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching education items:', error.message);
    }
  };
  
  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem('userId');
      console.log('Fetching details for user ID:', userId);
      const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
      const profileResponse = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
      console.log('Profile response:', profileResponse);
      console.log('User details response:', response);

      if (response.status === 200 && profileResponse.status === 200) {
        setUsername(response.data.username);
        if (profileResponse.data) {
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

              
            } = profileResponse.data;
 
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
            setIdNumber(resume || '');

            setEducationItems(education || []);
            setExperienceItems(experience || []);

          
          }
          console.log('pppppp:',profileResponse.data)

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
    navigate('/LoginPageA');
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

  const calculateProfileCompleteness = () => {
    let completeness = 0;
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
      resume, 
    ];
      const isEducationFilled = educationItem.length > 0;
    const isExperienceFilled = experienceItems.length > 0;
      const filledFieldsCount = requiredFields.filter(field => {
      if (field === undefined || field === null) return false;
      if (typeof field === 'string' && field.trim() === '') return false;
      if (Array.isArray(field) && field.length === 0) return false;
      return true;
    }).length;
  
    const totalFilledFieldsCount = filledFieldsCount + (isEducationFilled ? 1 : 0) + (isExperienceFilled ? 1 : 0);
    const totalFieldsCount = requiredFields.length + 2; // Adding 2 for education and experience items
  
    completeness = (totalFilledFieldsCount / totalFieldsCount) * 100;
  
    return completeness.toFixed(2);
  };
  
  const completenessPercentage = calculateProfileCompleteness();
  const progressDeg = (completenessPercentage / 100) * 360;
  const clampedPercentage = Math.max(0, Math.min(completenessPercentage, 100));

  console.log('Profile progressDeg:', progressDeg);

  const handleUpload = async () => {
    if (!resume) {
      console.error('No file selected.');
      return;
    }
    const formData = {
      resume
    }
    console.log('resume:',formData)
    try {
      const response = await axios.patch(`https://recruitment-portal-l0n5.onrender.com/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
          checkProfileResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/profile`);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            checkProfileResponse = { status: 404, data: null }; // Simulate response structure
          } else {
            throw error; // Re-throw other errors
          }
        }
        console.log('Existing Profile: ', checkProfileResponse);
        if (checkProfileResponse.status === 200 && checkProfileResponse.data) {
          // Update existing profile
          console.log('data: ', data);
          const updateResponse = await axios.patch('https://recruitment-portal-l0n5.onrender.com/profile', data);
          if (updateResponse.status === 200) {
            console.log('Profile updated successfully');
            setSaveMessage('Profile updated successfully!');
            setIsSaved(true);
          } else {
            setSaveMessage(`Failed to update profile: ${updateResponse.statusText}`);
          }
        } else {
          // Create new profile
          const createResponse = await axios.post('https://recruitment-portal-l0n5.onrender.com/profile', data);
          if (createResponse.status === 200) {
            console.log('Profile created successfully');
            setIsSaved(true);
          } else {
            console.error('Failed to create profile:', createResponse.status, createResponse.statusText);
          }
        }
      } catch (error) {
        setSaveMessage(`Error saving profile: ${error.response ? error.response.data : error.message}`);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };
  const ethnicityOptions = [
    'African',
    'Asian',
    'Coloured',
    'White',
    'Indian',
  ];

  const responsibilityOptions = [
    { value: 'Project Management', label: 'Project Management' },
    { value: 'Team Leadership', label: 'Team Leadership' },
    { value: 'Software Development', label: 'Software Development' },
    { value: 'Customer Relations', label: 'Customer Relations' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Other', label: 'Other' },
];
const handleProgressChange = (e) => {
    setInProgress(e.target.checked);
  };
  const employmentTypeOptions = [
    { value: 'full-time', label: 'full-time' },
    { value: 'part-time', label: 'part-time' },
    { value: 'contract', label: 'contract' },
    { value: 'internship', label: 'internship' },
  ];
  const handleResponsibilityChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setResponsibilities(selectedValues);
  };

  const handleEmploymentTypeChange = (selectedOption) => {
    setEmploymentType(selectedOption.value);
  };


const handleEditClick = () => {
  setIsModalOpen(true);
};
const handleEditClickEdu = () => {
  setIsModalOpenEdu(true);
};
const handleEditClickExp = () => {
  setIsModalOpenExp(true);
};
const handleCloseModal = () => {
  setIsModalOpen(false);

};
const handleCloseModalEdu = () => {
  setIsModalOpenEdu(false);

};
const handleCloseModalExp = () => {
  setIsModalOpenExp(false);

};
// };const UserInfo = ({ username, handleLogout }) => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);
// };
  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="logo">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="user-info" onClick={handleUserInfoClick}>
        <FaUser className="user-icon" />{username}
      </div>
      {dropdownVisible && (
        <div className="dropdown-menu">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      </header>

      <div className="admin-content">
        <aside className="side">
          <ul>
            {/* <li><a href="#home">Home</a></li> */}
            <li><a href="/OneProfile">Profile</a></li>
            {/* <li><a href="/ViewPosts">Documents</a></li> */}
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
              <p style={{ fontSize: '40px', color: 'blue' }}>{jobsAvailable}</p>
              </div>
            <div className="job-stat-box">
            <div className="profile-completeness">
          <h3>Profile Completeness</h3>
          <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${clampedPercentage}%` }}
          />
        </div>
        <div className="progress-label">{clampedPercentage}%</div>
      </div>
        
            </div>
          </div>
          <p></p>
          <div className="parent-container">
          <div className="jobsekerContainer">
            <div className="jobsekerWrapper">
              <div className="jobsekerLeft">
              <div class="jobsekerBox">
              <div className="job-stat-box">

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
                      {profileImage ? (
                        <img src={profileImage} alt="Profile Icon" className="profile-icon" />
                      ) : (
                        <FaUserCircle className="profile-icon" />
                      )}
                    </label>
                    <FaEdit className="edit-icon" onClick={handleEditClick} />
                    {(firstName || lastName || city || email || cellNumber) && (
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
                )}
      </div>
      </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
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
    <div className="left-column">
      <div className="question-text">Email *</div>
      <input type="email" className="edit-box" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>
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
   </div>

</div>

              
              <div className="jobsekerRight">
      <div className="jobsekerBox">
      <h2>Resume</h2>
      <div>
      <input type="file" onChange={handleFileChange} />

<div className="button-container">
  <button className="blue-button" onClick={handleUpload}>Upload Resume</button>
</div>
</div>
{resume && (
<div>
  <p>Selected file: {resume ? 'Resume file' : 'No file selected'}</p>
  <a href={resume} target="_blank" rel="noopener noreferrer">
    View Resume
  </a>
</div>
      )}
    </div>
    <Prof />

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
