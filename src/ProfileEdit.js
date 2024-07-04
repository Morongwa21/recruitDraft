import React, { useState, useEffect } from 'react';
import logo from './company logo.jpg'; // Make sure to provide the correct path for your logo image
import './components/AdminDash.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const ProfileEdit = () => {
    const [username, setUsername] = useState(""); 
    const [dropdownVisible, setDropdownVisible] = useState(false);
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
    const [resume, setCvFile] = useState(null);
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [province, setProvince] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [Ethnicity, setEthnicity] = useState('');
    const [idNumber, setIdNumber] = useState('');

    const [isSaved, setIsSaved] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchUserDetails();
    }, []);
  
    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');
            console.log('Fetching details for user ID:', userId);
            const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
            const profileResponse = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');

            console.log('Profile details response:', response); // Log the full response
  
            if (response.status === 200 && profileResponse.status === 200) {
                const userData = response.data;
                const profileData = profileResponse.data;
                console.log('User data:', userData);
                console.log('Profile data:', profileData);
                setUsername(userData.username);
                setRoleDescription(userData.roleDescription || profileData.roleDescription);
                setOtherRoleDescription(userData.otherRoleDescription || profileData.otherRoleDescription);
                setSkills(userData.skills || profileData.skills);
                setFirstName(userData.firstName || profileData.firstName);
                setLastName(userData.lastName || profileData.lastName);
                setCellNumber(userData.cellNumber || profileData.cellNumber);
                setAltNumber(userData.altNumber || profileData.altNumber);
                setCitizenship(userData.citizenship || profileData.citizenship);
                setEmail(userData.email || profileData.email);
                setDob(userData.dateOfBirth || profileData.dateOfBirth);
                setGender(userData.gender || profileData.gender);
                setDisability(userData.disabilityStatus || profileData.disabilityStatus);
                setCity(userData.city || profileData.city);
                setAddress(userData.address || profileData.address);
                setProvince(userData.province || profileData.province);
                setStreet(userData.street || profileData.street);
                setZipCode(userData.zipCode || profileData.zipCode);
                setCountry(userData.country || profileData.country);
                setIdNumber(userData.idNumber || profileData.idNumber);
                setEthnicity(userData.Ethnicity || profileData.Ethnicity);
                setCvFile(userData.resume || profileData.resume);

            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCvFile(reader.result); // base64 string
            };
            reader.readAsDataURL(file);
        } else {
            setCvFile(null);
        }
    };

    const handleSaveClick = async () => {
        const userId = localStorage.getItem('userId');
        const data = {
            roleDescription: roleDescription === 'other' ? otherRoleDescription : roleDescription,
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
            city,
            address,
            province,
            street,
            zipCode,
            country,
            idNumber,
            Ethnicity, 
            resume

        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        console.log('Data to be stored:', data);
        localStorage.setItem('data', JSON.stringify(data));

        if (resume) {
            localStorage.setItem('resume', resume);        }

        console.log('Data to be stored:', data);
        console.log('Resume:', resume);

        // Save formData to localStorage for demonstration purposes
        localStorage.setItem('data', JSON.stringify(data));
        if (resume) {
            localStorage.setItem('resume', resume.name);
        }

        setIsSaved(true);
        navigate('/EducationPage')
        // navigate('/EducationPage');
    };

    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/LoginPage'); 
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
                    <div className="button-container">
                        <button className="red-button" onClick={() => navigate('/ProfileEdit')}>Personal Info</button>
                        <button className="red-button" onClick={() => navigate('/EducationPage')}>Education</button>
                        <button className="red-button" onClick={() => navigate('/WorkExperience')}>Work Experience</button>
                    </div>
                    <p></p>
                    <div className="field-text">Fields with * indicate required</div>
                    <div className="left-column">
                        <div className="question-text">First Name *</div>
                        <input type="text" className="edit-box" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="right-column">
                        <div className="question-text">Last Name *</div>
                        <input type="text" className="edit-box" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="left-column">
                        <div className="question-text">Cell Number *</div>
                        <input type="text" className="edit-box" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} required />
                    </div>
                    <div className="right-column">
                        <div className="question-text">Alternative Number</div>
                        <input type="text" className="edit-box" value={altNumber} onChange={(e) => setAltNumber(e.target.value)} />
                    </div>
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
                    <div className="right-column">
                        <div className="question-text">Citizenship *</div>
                        <input type="text" className="edit-box" value={citizenship} onChange={(e) => setCitizenship(e.target.value)} required />
                    </div>
                    <div className="right-column">
                        <div className="question-text">ID/Passport Number *</div>
                        <input type="text" className="edit-box" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
                    </div>
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
                    <div className="right-column">
                        <div className="question-text">Resume *</div>
                        <input type="file" onChange={handleFileChange} accept=".pdf, .doc, .docx" className="edit-box" />
                    </div>





<div className="left-column">
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
                    <div className="right-column">
                        <div className="question-text">Street</div>
                        <input type="text" className="edit-box" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div className="left-column">
                        <div className="question-text">City *</div>
                        <input type="text" className="edit-box" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
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
                    <div className="left-column">
                        <div className="question-text">Country *</div>
                        <input type="text" className="edit-box" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </div>
                    <div className="button-container">
                        <button className="blue-button" onClick={handleSaveClick}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
