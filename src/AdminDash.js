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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const AdminPage = ({}) => {
    const [username, setUsername] = useState('');

    const [jobPostings, setJobPostings] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
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

    const fetchUserDetails = async () => {
        try {
            // Fetch user details using stored user ID
            const userId = localStorage.getItem('userId');
            console.log('Fetching details for user ID:', userId);
            const response = await axios.get(`https://recruitment-portal-rl5g.onrender.com/user/${userId}`);
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
            
            const response = await axios.get('https://recruitment-portal-l0n5.onrender.com/jobs');
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
    const handleUserInfoClick = () => {
        setDropdownVisible(!dropdownVisible);
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
    <div className="user-info" onClick={handleUserInfoClick}>
                    Welcome, {username}
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                            <button onClick={handleChangePassword}>Change Password</button>
                        </div>
                    )}
                </div>           
                 </header>
            <div className="admin-content">
                <aside className="side">
                    <ul>
                    <li><a href="#dashboard"><FontAwesomeIcon icon={faHome} /> Dashboard</a></li>
        <li><Link to="/AdminJobsView"><FontAwesomeIcon icon={faChartBar} /> Job Postings</Link></li>
        <li><a href="/AdminViewCandidates"><FontAwesomeIcon icon={faUsers} /> Candidates</a></li>
        {/* <li><a href="#users"><FontAwesomeIcon icon={faUser} /> Users</a></li> */}
        <li><a href="#analytics"><FontAwesomeIcon icon={faChartBar} /> Analytics</a></li>
        {/* <li><a href="#notifications"><FontAwesomeIcon icon={faBell} /> Notifications</a></li> */}
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
