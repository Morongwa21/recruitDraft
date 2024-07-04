import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/AdminDash.css'; // Assuming you have a CSS file for styling
import logo from './company logo.jpg'; // Adjust the path to your logo image
import { useNavigate } from 'react-router-dom';

const ViewPosts = () => {
  const [username, setUsername] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null); // State to hold user data
  const [editableResumeFile, setEditableResumeFile] = useState(null); // State for resume file
  const [editableOtherDocumentsFile, setEditableOtherDocumentsFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      // Fetch user details using stored user ID
      const userId = localStorage.getItem('userId');
      console.log('Fetching details for user ID:', userId);
      const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
      console.log('User details response:', response); // Log the full response

      if (response.status === 200) {
        setUsername(response.data.username);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
      console.log('User details response:', response);
      setUserData(response.data);
      setIsLoading(false);
      // Initialize editable document fields with fetched data
      setEditableResumeFile(response.data.resume);
      setEditableOtherDocumentsFile(response.data.otherDocuments);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/LoginPage');
  };

  const handleUserInfoClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleResumeFileChange = (event) => {
    setEditableResumeFile(event.target.files[0]); // Store the selected resume file
  };

  const handleOtherDocumentsFileChange = (event) => {
    setEditableOtherDocumentsFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Prepare form data to include file uploads
      const formData = new FormData();
      formData.append('resume', editableResumeFile);
      formData.append('otherDocuments', editableOtherDocumentsFile);

      // Send PATCH request with form data to update user documents
      const response = await axios.patch('https://recruitment-portal-l0n5.onrender.com/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Document upload response:', response);
      // Optionally, update state or show success message
    } catch (error) {
      console.error('Error uploading documents:', error.message);
      // Handle error state or display error message
    }
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
          <h1>Uploaded Documents</h1>
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
<p>
  Current Resume: {userData.resume ? (
    <>
      <span>{userData.resumeFileName}</span> {/* Display filename */}
      <a href={userData.resume} target="_blank" rel="noopener noreferrer">Download</a>
    </>
  ) : 'None'}
</p>
<p>
  Current Other Documents: {userData.otherDocuments ? (
    <>
      <span>{userData.otherDocumentsFileName}</span> {/* Display filename */}
      <a href={userData.otherDocuments} target="_blank" rel="noopener noreferrer">Download</a>
    </>
  ) : 'None'}
</p>
                <form onSubmit={handleSubmit}>
                  <label>
                    Update Resume:
                    <input type="file" onChange={handleResumeFileChange} />
                  </label>
                  <br />
                  <label>
                  Update Other Documents:
                    <input type="file" onChange={handleOtherDocumentsFileChange} />
                  </label>
                  <br />


                  <div className="button-container">
    <button className="blue-button" onClick={handleSubmit}>Save Changes</button>
</div>     
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewPosts;
