import React, { useState, useEffect } from 'react';
import logo from './company logo.jpg'; // Make sure to provide the correct path for your logo image
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'; // Import modal library

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    maxHeight: '80%',
    overflow: 'auto'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};
const ScreeningPage = () => {
    const [currentSection, setCurrentSection] = useState(1);
    const [username, setUsername] = useState(""); // State for holding the username
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate(); 
    const [profileData, setProfileData] = useState(null); 
    const [candidate, setCandidate] = useState({
      name: '',
      status: '',
      lastUpdated: '',
      position: '',
      resumeLink: '',
      screeningCriteria: [],
      notes: ''
    });
    const [chatbotOpen, setChatbotOpen] = useState(false); // State for chatbot modal
    const [messages, setMessages] = useState([
      { text: 'Hello! How can I help you?', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      fetchUserDetails();
    }, []); // Fetch user details on component mount
  
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://recruitment-portal-l0n5.onrender.com/user/${userId}`);
        const profileResponse = await axios.get('https://recruitment-portal-l0n5.onrender.com/profile');
  
        if (response.status === 200 && profileResponse.status === 200) {
          setUsername(response.data.username);
          setProfileData(profileResponse.data);
          // Assuming candidate data is part of profileResponse or fetched separately
          setCandidate({
            name: profileResponse.data.name,
            status: profileResponse.data.status,
            lastUpdated: profileResponse.data.lastUpdated,
            position: profileResponse.data.position,
            resumeLink: profileResponse.data.resumeLink,
            screeningCriteria: profileResponse.data.screeningCriteria,
            notes: profileResponse.data.notes
          });
        } else {
          console.error('Failed to fetch user details or profile data');
        }
      } catch (error) {
        console.error('Error fetching user details or profile data:', error.message);
      }
    };
  
    const handleUserInfoClick = () => {
      setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
    };
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/LoginPage'); // Navigate to login page after logout
    };
  
    const openChatbot = () => {
        setChatbotOpen(true); // Open chatbot modal
      };
  
      const closeChatbot = () => {
        setChatbotOpen(false); // Close chatbot modal
      };
  
      const sendMessage = () => {
        if (inputValue.trim() === '') return;
        const newMessage = { text: inputValue, sender: 'user' };
        setMessages([...messages, newMessage]);
        setInputValue('');
        simulateBotResponse(newMessage);
    };
  
    const simulateBotResponse = async (userMessage) => {
      try {
        // Simulate bot response (replace with actual bot logic)
        const botResponse = await axios.post('https://recruitment-portal-l0n5.onrender.com/chatbot', {
          message: userMessage.text
        });
  
        if (botResponse.status === 200) {
          setMessages([...messages, { text: botResponse.data.text, sender: 'bot' }]);
        } else {
          console.error('Failed to get bot response');
        }
      } catch (error) {
        console.error('Error communicating with chatbot:', error.message);
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
              <li><a href="#home">Home</a></li>
              <li><Link to="/ProfileUsers">Profile</Link></li>
              <li><Link to="/ViewPosts">Documents</Link></li>
              <li><a href="/IkusasaProgram">Job Listings</a></li> 
              <li><a href="/ViewAJobs">Job Applications</a></li>
              <li><a href="/ScreeningPage">Screening</a></li>
              <li><a href="#cta">Call-to-Action</a></li>
            </ul>
          </aside>
          <div className="main-content">
            <h1>Candidate Screening</h1>
  
            <div className="candidate-info">
              <h2>{candidate.name}</h2>
              <p>Status: {candidate.status}</p>
              <p>Last Updated: {candidate.lastUpdated}</p>
              <p>Applied Position: {candidate.position}</p>
            </div>
  
            <div className="resume-section">
              <h2>Resume/CV</h2>
              <p><a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer">View/Download Resume</a></p>
            </div>
  
            <div className="screening-criteria">
              <h2>Screening Criteria</h2>
              <ul>
              {candidate.screeningCriteria && candidate.screeningCriteria.map((item, index) => (
    <li key={index}>
      <strong>{item.criteria}: </strong> {item.status}
    </li>
                ))}
              </ul>
            </div>
  
            <div className="notes-section">
              <h2>Notes & Communication</h2>
              <p>{candidate.notes}</p>
            </div>
  
            <div className="actions">
            <Link to="/update-profile">Update Profile</Link>
            <p></p>
            <button onClick={openChatbot}>
              <FontAwesomeIcon icon={faCommentAlt} /> Chat Support
            </button>
          </div>
          </div>
        </div>
        <Modal
          isOpen={chatbotOpen}
          onRequestClose={closeChatbot}
          style={customModalStyles}
          contentLabel="Chatbot Modal"
        >
          <div className="chatbot-modal">
            <div className="chatbot-content">
              <div className="chatbot-header">
                <h2>Chatbot Support</h2>
                <button className="close-btn" onClick={closeChatbot}>Close</button>
              </div>
              <div className="chatbot-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              <div className="chatbot-input">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                />
                <p>



                    
                </p>
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
export default ScreeningPage;
