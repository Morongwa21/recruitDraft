import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaUser, FaArrowLeft } from 'react-icons/fa';
import logo from './company logo.jpg';
import BasicTemp from './BasicTemp';
import { ClipLoader } from 'react-spinners'; 
import ElegantTemp from './ElegantTemp';
import TemplateSelector from './TemplateSelector';

const CVTemplate = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Basic');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://recruitment-portal-rl5g.onrender.com/profile`);
        setProfile(response.data.profile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false); // Stop the spinner after data is fetched
      }
    };

    fetchProfile();
  }, [userId]);

 

  const handleChangeTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/LoginPageA');
  };
  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case 'Elegant':
        return ElegantTemp;
      case 'Basic':
      default:
        return BasicTemp;
    }
  };

  const TemplateComponent = getTemplateComponent();

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="logo">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="user-info" onClick={() => setDropdownVisible(!dropdownVisible)}>
          <FaUser className="user-icon" />
        </div>
        {dropdownVisible && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      <div className="cv-content">
        <button className="cvb-button" onClick={handleBack}>
          <FaArrowLeft className="back-icon" /> Back
        </button>
        <TemplateSelector currentTemplate={selectedTemplate} onChangeTemplate={handleChangeTemplate} />

        {loading ? (
          <div className="spinner-container">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
            <p>Loading profile data...</p>
          </div>
        ) : (
          <>
            <h1>{profile.firstName} {profile.lastName}'s CV</h1>
            <PDFDownloadLink
              document={<TemplateComponent profile={profile} />}
              fileName={`${profile.firstName}-${profile.lastName}-CV.pdf`}
            >
              {({ loading }) => (
                <button className="download-button">
                  {loading ? 'Generating PDF...' : 'Download CV'}
                </button>
              )}
            </PDFDownloadLink>
          </>
        )}
      </div>
    </div>
  );
};

export default CVTemplate;
