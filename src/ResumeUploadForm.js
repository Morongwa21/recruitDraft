
import React, { useState } from "react";
import axios from "axios";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ResumeUploadForm = () => {
  const [formData, setFormData] = useState({
    resume: "", // Adjust form data for resume upload
  });

  const [file, setFile] = useState();



  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [uploading, setUploading] = useState(false);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setFile(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, resume: reader.result }); // Update form data for resume
    };
    setError(null);
    setMessage(null);
  };

  const submitResume = async (data) => {
    try {
      const response = await axios.patch(`https://recruitment-portal-utcp.onrender.com/profile`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response)
      setMessage(response.data.message);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "An error occurred");
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    submitResume(formData);
  };

  return (
    <div className="max-w-md mx-auto py-4 px-8 bg-white shadow-lg rounded-lg">
      {uploading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10-5.291a7.962 7.962 0 01-2 5.291l3 2.647A8.01 8.01 0 0120 12h-4z"
            ></path>
          </svg>
          <p className="">Uploading resume...</p>
        </div>
      ) : error ? (
        <p className="flex items-center text-red-500">
          <FaTimesCircle className=" pr-1" size={20} /> {error}
        </p>
      ) : message ? (
        <p className="flex items-center text-green-500">
          <FaCheckCircle className=" pr-1" size={20} /> {message}
        </p>
      ) : null}

      <h1 className="text-2xl font-bold mb-6">Upload Your Resume</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="resume"
            className="block text-gray-700 font-bold mb-2"
          >
            Resume
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleResumeChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ResumeUploadForm;