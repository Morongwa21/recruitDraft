import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './components/AdminDash.css'; // Create a separate CSS file for styling
import logo from './company logo.jpg';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUser, faUsers, faBell,faHome } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const AdminPage = ({}) => {
    const [username, setUsername] = useState('');

    const [jobPostings, setJobPostings] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unviewedCount, setUnviewedCount] = useState(0);
    const navigate = useNavigate();

    const [jobChartData, setJobChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Number of Postings',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });
    useEffect(() => {
        fetchUserDetails();

        fetchJobPostings();
    }, []);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/notifications');
                setNotifications(response.data);
      
                // Count unviewed notifications
                const unviewed = response.data.filter(notification => !notification.viewed);
                setUnviewedCount(unviewed.length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
      
        fetchNotifications();
      }, []);
      const handleBellClick = (event) => {
        event.stopPropagation();  // Prevent click from triggering other click handlers
        setIsNotificationsOpen(!isNotificationsOpen);
      };
      
      
      const handleUserInfoClick = (e) => {
        e.stopPropagation();  // Prevent the global click handler from running
        setDropdownVisible(!dropdownVisible);
    };      
    const handlePageClick = () => {
          setIsNotificationsOpen(false);
          setDropdownVisible(false);
      };
    const fetchUserDetails = async () => {
        try {
            // Fetch user details using stored user ID
            const userId = localStorage.getItem('userId');
            console.log('Fetching details for user ID:', userId);
            const response = await axios.get(`https://recruitment-portal-t6a3.onrender.com/user/${userId}`);
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


    const fetchJobPostings = async () => {
        try {
            
            const response = await axios.get('https://recruitment-portal-t6a3.onrender.com/jobs');
            setJobPostings(response.data);
            prepareChartData(response.data);

        } catch (error) {
            console.error('Error fetching job postings:', error.message);
        }
    };
    const prepareChartData = (jobs) => {
        const jobCountsMap = {};
    
        // Aggregate counts for each job title
        jobs.forEach((job) => {
            if (jobCountsMap[job.title]) {
                jobCountsMap[job.title]++;
            } else {
                jobCountsMap[job.title] = 1;
            }
        });
    
        const jobTitles = Object.keys(jobCountsMap);
        const jobCounts = Object.values(jobCountsMap);
    
        const data = {
            labels: jobTitles,
            datasets: [
                {
                    label: 'Number of Postings',
                    data: jobCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    
        setJobChartData(data);
    };
 

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleChangePassword = () => {
        navigate('/changepassword');
    };
 
    return (
        <div className="admin-page">
       <header className="admin-header">
        <div className="logo">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="user-info">
                    <FaBell className="bell-icon" onClick={handleBellClick} /> 
                    {unviewedCount > 0 && (
                        <span className="notification-count">{unviewedCount}</span>
                    )}

{isNotificationsOpen && (
        <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
            <h3>Notifications</h3>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>
                        <div className="notification-message">
                            {notification.message}
                            {!notification.viewed && <strong> (New)</strong>}
                        </div>
                        <div className="notification-date">
                            {new Date(notification.receivedAt).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
                    )}
                    <FaUser className="user-icon" onClick={handleUserInfoClick} />
                    {dropdownVisible && (
                        <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </header>
            <div className="admin-content">
                <aside className="side">
                    <ul>
                    <li><a href="/AdminDash"><FontAwesomeIcon icon={faHome} /> Dashboard</a></li>
        <li><Link to="/AdminJobsView"><FontAwesomeIcon icon={faChartBar} /> Job Postings</Link></li>
        <li><a href="/AdminViewCandidates"><FontAwesomeIcon icon={faUsers} /> Candidates</a></li>
        {/* <li><a href="#users"><FontAwesomeIcon icon={faUser} /> Users</a></li> */}
         {/* <li><a href="#notifications"><FontAwesomeIcon icon={faBell} /> Notifications</a></li>  */}
                    </ul>
                </aside>


                
                <div className="main-content">
                    <h2>Dashboard Overview</h2>
                    <div className="card-container">
                        <div className="card">Job Posting</div>
                        <div className="card">Active Applications</div>
                        <div className="card">Posted Jobs Chart</div>
                    </div>
                    <div className="graph">
                    <h2>Posted Jobs Chart</h2>
    <div className="chart-container">
        <Bar 
        data={jobChartData} 
        options={{
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        }}
    />
    </div>                    </div>
                </div>
            </div>
        </div>
       
    );
};

export default AdminPage;
