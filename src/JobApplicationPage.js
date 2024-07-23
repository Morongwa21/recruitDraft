import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/UserViewPosts.css';
import logo from './company logo.jpg';
import { useParams, useNavigate } from 'react-router-dom';

const JobApplicationPage = () => {
  const [coverLetter, setCoverLetter] = useState('');
  const [job, setJob] = useState(null);
  const [username, setUsername] = useState(""); 
  const [profileData, setProfileData] = useState(null); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const jobId = localStorage.getItem('jobId') || id;
        
        const [jobResponse, userResponse] = await Promise.all([
          axios.get(`https://recruitment-portal-l0n5.onrender.com/jobs/${jobId}`),
          axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`)
        ]);

        setJob(jobResponse.data);
        setUsername(userResponse.data);

        try {
          const profileResponse = await axios.get(`https://recruitment-portal-l0n5.onrender.com/profile`);
          setProfileData(profileResponse.data); // Set the profile data

          console.log('Profile response:', profileResponse);
        } catch (profileError) {
          if (profileError.response && profileError.response.status === 404) {
            alert('Profile not found. Please create your profile.');
            navigate('/ProfileEdit');
          } else {
            throw profileError;
          }
        }

        console.log('Job Details:', jobResponse.data);
        console.log('User Details:', userResponse.data);

        localStorage.setItem('jobId', jobResponse.data._id);
        console.log('Job Id:', jobResponse.data._id);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/LoginPage'); // Make sure '/login' is the correct route for your login page
  };

  const handleApply = async () => {
    if (!profileData) {
      alert('Please create your profile before applying.');
      navigate('/ProfileEdit');
      return;
    }

    const formData = new FormData();
    formData.append('coverLetter', coverLetter); // Add cover letter text
    formData.append('resume', profileData.resume); // Use the resume from the profile

    try {
      const response = await axios.post(`https://recruitment-portal-l0n5.onrender.com/applications/${job._id}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Application submitted:', response.data);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again later.');
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  const {
    company,
    title,
    location,
    createdAt,
  } = job;

  return (
    <div>
      <div className="logos">
        <img src={logo} alt="Company Logo" />
      </div>
      <div className="apply-container">
        <header className="apply-header">
          <h1>{title}</h1>
          <p>Company: {company}</p>
          <p>Location: {location}</p>
          <p>Application Deadline: {new Date(createdAt).toLocaleDateString()}</p>
        </header>
        <section className="apply-section">
          <h2>Cover Letter</h2>
          <textarea
            className="apply-textarea"
            placeholder="Write your cover letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </section>
        <div className="user-view-post-buttons">
          <button onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;