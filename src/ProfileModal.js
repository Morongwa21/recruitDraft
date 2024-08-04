// src/components/ProfileModal.js
import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './components/AdminDash.css'; 
import './components/OneProfile.css'; 

const ProfileModal = ({
  isModalOpen,
  handleCloseModal,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  email,
  setEmail,
  cellNumber,
  setCellNumber,
  address,
  setAddress,
  city,
  setCity,
  province,
  setProvince,
  zipCode,
  setZipCode,
  country,
  setCountry,
  loading,
  handleSaveClick
}) => {
  if (!isModalOpen) return null;

  return (
    
    <div className="modal-overlay">
      <div className="modal">
        {loading && (
          <div className="spinner-overlay">
            <FaSpinner className="spinner" />
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
                <input
                  type="text"
                  className="edit-box"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="right-column">
                <div className="question-text">Last Name *</div>
                <input
                  type="text"
                  className="edit-box"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="left-column">
                <div className="question-text">Email *</div>
                <input
                  type="email"
                  className="edit-box"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="right-column">
                <div className="question-text">Cell Number *</div>
                <input
                  type="text"
                  className="edit-box"
                  value={cellNumber}
                  onChange={(e) => setCellNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="left-column">
                <div className="question-text">Address *</div>
                <input
                  type="text"
                  className="edit-box"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="right-column">
                <div className="question-text">City *</div>
                <input
                  type="text"
                  className="edit-box"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="left-column">
                <div className="question-text">Province *</div>
                <input
                  type="text"
                  className="edit-box"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  required
                />
              </div>
              <div className="right-column">
                <div className="question-text">Zip Code *</div>
                <input
                  type="text"
                  className="edit-box"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="left-column">
                <div className="question-text">Country *</div>
                <input
                  type="text"
                  className="edit-box"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="save-button" onClick={handleSaveClick}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
