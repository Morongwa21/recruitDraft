
import React, { useState } from 'react';
import axios from 'axios';

const ProfilePicture = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size exceeds 5MB');
        setFile(null);
        setPreview('');
      } else {
        setFile(selectedFile);
        setError('');

        // Create a FileReader to read the file and generate a preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result); // Set the preview URL
        };
        reader.readAsDataURL(selectedFile); // Read the file as a data URL
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Send the base64 string as part of the request body
      const response = await axios.patch(`https://recruitment-portal-rl5g.onrender.com/profile`, {
        profilePicture: preview,
      }, {
        headers: {
          'Content-Type': 'application/json', // Ensure this matches the server expectations
        },
      });

      console.log(response);
      setSuccess('Profile picture updated successfully!');
      setPreview(''); // Clear preview on successful upload
      setFile(null);  // Clear file state
    } catch (error) {
      setError('Error uploading profile picture');
      console.error('Error uploading profile picture:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <img src="" alt="" />
      <h2 className="text-xl font-semibold mb-4">Update Profile Picture</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} transition duration-300`}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        {preview && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Preview:</h3>
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-300"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePicture;