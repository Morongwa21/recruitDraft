import React, { useState, useEffect } from 'react';
import logo from './company logo.jpg';
import './components/AdminDash.css'; 
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaUserCircle } from 'react-icons/fa';

const OneProfile = () => {
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
//   const [resume, setCvFile] = useState(null);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [Ethnicity, setEthnicity] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [employmentType, setEmploymentType] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [responsibilities, setResponsibilities] = useState([]);
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [institution, setInstitution] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [educationItem, setEducationItems] = useState([]);
  const [experienceItem, setExperienceItems] = useState([]);
  const [resume, setResume] = useState(null);

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
    console.log('Length of education items:', educationItem.length);
    console.log('Length of experience items:', experienceItem.length);
  }, [jobsAvailable, educationItem, experienceItem]);

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
//               experience: {
// title ='',
// company ='',
// location ='',
// startDate ='',
// endDate ='',
// employmentType ='',
// responsibilities ='',



//               }={},
//               education: {
//                 institution ='',
//                 institutionType ='',
//                 fieldOfStudy ='',
              
                
                
//                 /* institution,
//     institutionType,
//     degree,
//     fieldOfStudy,
//     startDate: formattedStartDate,
//     endDate: inProgress ? null : formattedEndDate,
//     employmentType,*/
                
//                               }={},
              
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

  const calculateProfileCompleteness = () => {
    let completeness = 0;
  
    const requiredFields = [
      firstName, lastName, cellNumber, email,
      roleDescription, gender, citizenship,
      dateOfBirth, disabilityStatus, address,
      city, province, zipCode, country,
      educationItem.length > 0,
      experienceItem.length > 0,
    ];
    console.log('Education Items:', educationItem);
    console.log('Experience Items:', experienceItem);
    const filledFieldsCount = requiredFields.filter(field => !!field).length;
    completeness = (filledFieldsCount / requiredFields.length) * 100;
    return completeness.toFixed(2);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
    }
  };
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
            setIsSaved(true);
          } else {
            console.error('Failed to update profile:', updateResponse.status, updateResponse.statusText);
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
        console.error('Error saving profile:', error.response ? error.response.data : error.message);
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

 const handleSaveWorkExperience = async () => {
  const userId = localStorage.getItem('userId');
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

  const experienceItem = {
    title,
    company,
    startDate: formattedStartDate,
    endDate: inProgress ? null : formattedEndDate,
    employmentType,
    responsibilities: responsibilities.join(', ')
  };
  try {
    let checkExperienceResponse;
    try {
      checkExperienceResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/profile`);
    } catch (error) {      if (error.response && error.response.status === 404) {
        checkExperienceResponse = { status: 404, data: null }; 
      } else {
        throw error; 
      }
    }
    console.log('Existing Profile:', checkExperienceResponse);
    console.log('Experience Item:', experienceItem);
    if (checkExperienceResponse.status === 200 && checkExperienceResponse.data) {
      const updateResponse = await axios.patch(`https://recruitment-portal-l0n5.onrender.com/profile`, { experience: [experienceItem] });

      if (updateResponse.status === 200) {
        console.log('Work experience updated successfully:', updateResponse.data.message);
        if (updateResponse.data.profile) {
          console.log('Updated Profile Data:', updateResponse.data.profile); // Log updated profile data if available
        }
        setIsSaved(true);
      } else {
        console.error('Failed to update work experience:', updateResponse.status, updateResponse.statusText);
      }
    } else {
      const createResponse = await axios.post('https://recruitment-portal-l0n5.onrender.com/profile', { experience: [experienceItem] });
      console.log('Create Response:', createResponse);

      if (createResponse.status === 201) {
        console.log('Work experience saved successfully:', createResponse.data.message);
        setIsSaved(true);
      } else {
        console.error('Failed to save work experience:', createResponse.status, createResponse.statusText);
      }
    }
  } catch (error) {
    console.error('Error saving work experience:', error.message);
  }
};
const handleEducation = async () => {
  const userId = localStorage.getItem('userId');
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
  
  const educationItem = {
    institution,
    institutionType,
    degree,
    fieldOfStudy,
    startDate: formattedStartDate,
    endDate: inProgress ? null : formattedEndDate,
   
  };

  console.log('Education Item:', educationItem);
  
  let checkEducationResponse;
  
  try {
    try {
      checkEducationResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/profile`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        checkEducationResponse = { status: 404, data: null }; // Simulate response structure
      } else {
        throw error; // Re-throw other errors
      }
    }
    
    console.log('Existing Profile:', checkEducationResponse);
    
    if (checkEducationResponse.status === 200 && checkEducationResponse.data) {
      // Profile exists, update the profile
      const existingProfile = checkEducationResponse.data;
      const updatedProfile = { ...existingProfile, education: [...(existingProfile.education || []), educationItem] };
      
      const updateResponse = await axios.patch(`https://recruitment-portal-l0n5.onrender.com/profile`, updatedProfile);
      
      if (updateResponse.status === 200) {
        console.log('Education has been updated successfully:', updateResponse.data.message);
        if (updateResponse.data.profile) {
          console.log('Updated Profile Data:', updateResponse.data.profile); // Log updated profile data if available
        }
        setIsSaved(true);
      } else {
        console.error('Failed to update education:', updateResponse.status, updateResponse.statusText);
      }
    } else {
      const createResponse = await axios.post('https://recruitment-portal-l0n5.onrender.com/profile', { education: [educationItem] });
      console.log('Create Response:', createResponse);
      if (createResponse.status === 201) {
        console.log('Education saved successfully:', createResponse.data.message);
        setIsSaved(true);
      } else {
        console.error('Failed to save education:', createResponse.status, createResponse.statusText);
      }
    }
  } catch (error) {
    console.error('Error saving education:', error.message);
  }
};
//Handle Delete
const handleDelete = (index) => {
  const updatedEducationItems = [...educationItem];
  updatedEducationItems.splice(index, 1);
  setEducationItems(updatedEducationItems);
  console.log('Deleted education item at index:', index);
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
            <li><a href="/OneProfile">Profile</a></li>
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
              <p style={{ fontSize: '40px', color: 'blue' }}>{jobsAvailable}</p>
              </div>
            <div className="job-stat-box">
            <div className="profile-completeness">
          <h3>Profile Completeness</h3>
          <div className="circle-progress">
            <div
              className="progress-fill"
              style={{ transform: `rotate(${(calculateProfileCompleteness() / 100) * 360}deg)` }}
            ></div>
            <div className="progress-label">{calculateProfileCompleteness()}%</div>
          </div>
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
                      {profileImage ? (
                        <img src={profileImage} alt="Profile Icon" className="profile-icon" />
                      ) : (
                        <FaUserCircle className="profile-icon" />
                      )}
                    </label>
                  </div>
                
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
          <p>Selected file: {resume.name}</p>
          {/* Optionally add a preview or details of the selected file */}
        </div>
      )}
    </div>
     <div className="jobseekerBox">
       <h1><strong>Work Experience</strong></h1>
       <div className="form-container">
        <div className="left-column">
          <div className="question-text">Company</div>
          <input
            type="text"
            className="edit-box"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="left-column">
          <div className="question-text">Title</div>
          <input
            type="text"
            className="edit-box"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="left-column">
          <div className="question-text">Employment Type</div>
          <Select
            options={employmentTypeOptions}
            value={employmentTypeOptions.find(option => option.value === employmentType)}
            onChange={handleEmploymentTypeChange}
          />
        </div>
        <div className="left-column">
          <div className="question-text">Responsibilities</div>
          <Select
            options={responsibilityOptions}
            value={responsibilities.map(res => ({ value: res, label: res }))}
            isMulti
            onChange={handleResponsibilityChange}
          />
        </div>
        <div className="left-column">
          <div className="question-text">Start Date</div>
          <input
            type="date"
            id="startDate"
            className="edit-box"
            value={startDate ? startDate.toISOString().substr(0, 10) : ''}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            required
          />
        </div>
        {!inProgress && (
          <div className="left-column">
            <div className="question-text">End Date</div>
            <input
              type="date"
              id="endDate"
              className="edit-box"
              value={endDate ? endDate.toISOString().substr(0, 10) : ''}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </div>
        )}
        <div className="left-column">
          <div className="question-text">Progress</div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="inProgress"
              className="checkbox-input"
              checked={inProgress}
              onChange={handleProgressChange}
            />
          </div>
        </div>
    <div className="button-container">
      <button className="blue-button" onClick={handleSaveWorkExperience}>Add</button>
    </div>
    <div className="experience-container">
  {experienceItem.map((exp, index) => (
    <div key={index} className="Experience">
            <h><strong>Experience</strong></h>
            <p>----------------</p>

      <p><strong>Company:</strong> {exp.company}</p>
      <p><strong>Title:</strong> {exp.title}</p>
      <p><strong>Employment Type:</strong> {exp.employmentType}</p>
      <p><strong>Responsibilities:</strong> {exp.responsibilities}</p>
      <p><strong>Start Date:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(exp.endDate).toLocaleDateString()}</p>
      <button onClick={() => handleDelete(index)}>Delete</button>

    </div>
  ))}
</div>
  </div>
 
</div>
            <div class="jobsekerBox">
            <h><strong>Education</strong></h>
                  <div className="form-container">
                  
                      <div className="left-column">
                        <div className="question-text">Institution *</div>
                        <input type="text" className="edit-box" value={institution} onChange={(e) => setInstitution(e.target.value)} required />
                      </div>
                      <div className="right-column">
      <div className="question-text">Institution Type *</div>
      <select className="edit-box" value={institutionType} onChange={(e) => setInstitutionType(e.target.value)} required>
        <option value="">Select Institution Type</option>
        <option value="University">University</option>
        <option value="College">College</option>
        <option value="High School">High School</option>
        <option value="Other">Other</option>
      </select>
    </div>
                      <div className="right-column">
                        <div className="question-text">Degree *</div>
                        <input type="text" className="edit-box" value={degree} onChange={(e) => setDegree(e.target.value)} required />
                      </div>
                    
                   
                      <div className="left-column">
                        <div className="question-text">Field of Study *</div>
                        <input type="text" className="edit-box" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} required />
                      </div>
                      <div className="right-column">
  <div className="question-text">Start Date *</div>
  <input 
    type="date" 
    className="edit-box" 
    value={startDate ? startDate.toISOString().substr(0, 10) : ''} 
    onChange={(e) => setStartDate(new Date(e.target.value))} 
    required 
  />
</div>              
{!inProgress && (
      <div className="left-column">
        <div className="question-text">End Date</div>
        <input
          type="date"
          id="endDate"
          className="edit-box"
          value={endDate ? endDate.toISOString().substr(0, 10) : ''}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
      </div>
    )}
     <div className="left-column">
      <div className="question-text">Progress</div>
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="inProgress"
          className="checkbox-input"
          checked={inProgress}
          onChange={handleProgressChange}
        />
      </div>
    </div>
    <div className="button-container">
      <button className="blue-button" onClick={handleEducation}>Add</button>
    </div>                     <div className="experience-container">
  {educationItem.map((edu, index) => (
    <div key={index} className="Experience">
            <h><strong>Education</strong></h>
            <p>----------------</p>

      <p><strong>Institution:</strong> {edu.institution}</p>
      <p><strong>Institution Type:</strong> {edu.institutionType}</p>
      <p><strong>Field Of Study:</strong> {edu.fieldOfStudy}</p>
      <p><strong>Degree:</strong> {edu.degree}</p>
      <p><strong>Start Date:</strong> {new Date(edu.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(edu.endDate).toLocaleDateString()}</p>
      <button onClick={() => handleDelete(index)}>Delete</button>

    </div>
  ))}
</div>
                  </div>


                </div>

                </div>
            </div>
        </div>
    </div>
</div>
            </div>
        
      );
  };
export default OneProfile;
