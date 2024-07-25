import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FaEdit, FaUserCircle, FaTrash, FaPlus, FaBuilding, FaBriefcase, FaClock, FaTasks, FaCalendarAlt } from 'react-icons/fa';
import './components/AdminDash.css';
import './components/OneProfile.css';

const Prof = () => {
  const [experienceItems, setExperienceItems] = useState([]);
  const [isModalOpenExp, setIsModalOpen] = useState(false);
  const [employmentType, setEmploymentType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [responsibilities, setResponsibilities] = useState([]);
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [loading, setLoading] = useState(false);

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full-Time' },
    { value: 'part-time', label: 'Part-Time' },
    // Add more options as needed
  ];

  const responsibilityOptions = [
    { value: 'coding', label: 'Coding' },
    { value: 'testing', label: 'Testing' },
    // Add more options as needed
  ];

  const fetchExperience = async () => {
    try {
      const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
      if (response.status === 200) {
        const profile = response.data.profile || {};
        const experience = Array.isArray(profile.experience) ? profile.experience : [];
        setExperienceItems(experience);
      } else {
        console.error('Failed to fetch profile:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching experience:', error.message);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleSaveWorkExperience = async () => {
    setLoading(true);


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
      const checkExperienceResponse = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
      const existingExperiences = checkExperienceResponse.status === 200 ? checkExperienceResponse.data.experience || [] : [];
      const updatedExperiences = [...existingExperiences, experienceItem];

      const updateResponse = await axios.patch('https://recruitment-portal-l0n5.onrender.com/profile', { experience: updatedExperiences });

      if (updateResponse.status === 200) {
        console.log('Work experience updated successfully:', updateResponse.data.message);
        setIsModalOpen(false);
        fetchExperience();
      } else {
        console.error('Failed to update work experience:', updateResponse.status, updateResponse.statusText);
      }
    } catch (error) {
      console.error('Error saving work experience:', error.message);
    } finally {
        setLoading(false);
      }
  };

  const handleEditClickExp = () => {
    setIsModalOpen(true);
  };

  const handleCloseModalExp = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (experienceId, index) => {
    try {
      const response = await axios.delete(`https://recruitment-portal-l0n5.onrender.com/profile/experience/${experienceId}`);
      if (response.status === 200) {
        console.log('Experience deleted successfully');
        const updatedExperienceItems = [...experienceItems];
        updatedExperienceItems.splice(index, 1);
        setExperienceItems(updatedExperienceItems);
      } else {
        console.error('Failed to delete experience:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting experience:', error.message);
    }
  };
  

  const handleEmploymentTypeChange = (selectedOption) => {
    setEmploymentType(selectedOption ? selectedOption.value : '');
  };

  const handleResponsibilityChange = (selectedOptions) => {
    setResponsibilities(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleProgressChange = (e) => {
    setInProgress(e.target.checked);
  };

  return (
    <div>
        
      {isModalOpenExp && (
        <div className="modal-overlay">
          <div className="modal">
          {loading && (
              <div className="spinner-overlay">
                <div className="spinner"></div>
              </div>
            )}
            <div className="modal-header">
              <button className="close-button" onClick={handleCloseModalExp}>
                &times;
              </button>
            </div>
            <div className="modal-body">
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
                    value={startDate.toISOString().substr(0, 10)}
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
              </div>
            </div>
          </div>
        </div>
      )}
    <div className="job-stat-box">
        <h2><strong>Experience</strong></h2>
        <p>----------------</p>
        <button className="blue-button" onClick={handleEditClickExp}>
          <FaPlus className="icon" /> Add New Experience
        </button>

        {experienceItems.length === 0 ? (
          <p>No experience added yet. Click the button above to add.</p>
        ) : (
          experienceItems.map((exp, index) => (
            <div key={exp._id || index} className="experience-item">
              <div className="personal-info">
                <p><FaBuilding className="info-icon" /> <strong>Company:</strong> {exp.company}</p>
                <p><FaBriefcase className="info-icon" /> <strong>Title:</strong> {exp.title}</p>
                <p><FaClock className="info-icon" /> <strong>Employment Type:</strong> {exp.employmentType || 'N/A'}</p>
                <p><FaTasks className="info-icon" /> <strong>Responsibilities:</strong> {exp.responsibilities || 'N/A'}</p>
                <p><FaCalendarAlt className="info-icon" /> <strong>Start Date:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
                <p><FaCalendarAlt className="info-icon" /> <strong>End Date:</strong> {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                <FaTrash
                  onClick={() => handleDelete(exp._id, index)}
                  className="delete-icon"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Prof;
