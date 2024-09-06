import React from 'react';
import './components/LandingPage.css';
import recruitingImage from './recruiting.png';
import logo from './company logo.jpg';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaRegLifeRing, FaSearch } from 'react-icons/fa'; // Import icons from react-icons library
import { AiOutlineUserAdd } from 'react-icons/ai'; // Example vector icon for "Get Started"

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/LoginPageA');
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const query = event.target.search.value;
        navigate(`/JobListings?search=${query}`);
    };

    return (
        <div className="landing-page">
            <header>
                <div className="logo">
                    <img src={logo} alt="Company logo" />
                </div>
                <nav>
                    <ul>
                        <li><a href="/"><FaUsers /> Home</a></li> {/* Added Home icon */}
                        <li><a href="/UserViewPost"><FaSearch /> Job Listings</a></li> {/* Added Job Listings icon */}
                        <li><a href="/SupportPage"><FaRegLifeRing /> Support</a></li>                    </ul>
                </nav>
            </header>
            <main>
                <div className="image-container">
                    <img src={recruitingImage} alt="Recruiting" />
                    <div className="blue-container">
                        <div className="content">
                            <h1>Welcome to Ikusasa Recruitment Portal</h1>
                            <p>Welcome to our platform, where amazing job opportunities are waiting for you. We make it easy for you to find jobs that match your skills and goals. To start your journey and discover new possibilities, just click "Get Started" to create your profile. Your next job could be just one click away. Join us today, and let's build your future together.</p>
                            <button className="get-started-btn arrow-btn" onClick={handleGetStartedClick}>
                                <AiOutlineUserAdd className="icon" /> Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
