import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/LoginA.css';
import logo from './company logo.jpg';
import axios from 'axios'; 
import { FaUser, FaLock, FaRegEyeSlash, FaRegEye, FaUsers, FaSearch, FaRegLifeRing  } from 'react-icons/fa'; // Import icons from react-icons library

axios.defaults.withCredentials = true;

const LoginPageA = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleForgotPasswordClick = () => {
        navigate('/ForgotPassPage');
    };

    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please enter your email and password.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('https://recruitment-portal-utcp.onrender.com/login', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                console.log('Login response:', response.data);

                const { token } = response.data; 
                localStorage.setItem('token', token);
                console.log('token: ', token)
                const userResponse = await axios.get('https://recruitment-portal-utcp.onrender.com/user/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (userResponse.status === 200) {
                    console.log('User details:', userResponse.data);

                    const { _id, accountType } = userResponse.data;
                    localStorage.setItem('userId', _id); 
                    console.log('User ID:', _id);

                    if (accountType === 'recruiter') {
                        navigate('/AdminDash');
                    } else {
                        navigate('/OneProfile');
                    }
                } else {
                    alert('Failed to fetch user details.');
                }
            } else {
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('Incorrect Email or Password, Please check if your credentials are correct!');
        } finally {
            setLoading(false);   
        }
    };

    return (
        <div className="login-page">
            <header className="login-header">
                <div className="logo">
                    <img src={logo} alt="Company logo" />
                </div>
                <nav>
                    <ul>
                    <li><a href="/"><FaUsers /> Home</a></li> {/* Added Home icon */}
                        <li><a href="/UserViewPost"><FaSearch /> Job Listings</a></li>
                        <li><a href="/SupportPage"><FaRegLifeRing /> Support</a></li>                    </ul>

                </nav>
            </header>
       
            <div className="login-heading">
                <h2>Login</h2>
            </div>
            <form className="login-container" onSubmit={handleSubmit}>
                <label htmlFor="email"><FaUser /> Email:</label>
                <input 
                    type="text" 
                    id="email" 
                    placeholder="Email" 
                    className="Login-input-field" 
                    value={email} 
                    onChange={handleEmailChange} 
                />
                <label htmlFor="password"><FaLock /> Password:</label>
                <div className="password-field">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        id="password" 
                        placeholder="Password" 
                        className="Login-input-field" 
                        value={password} 
                        onChange={handlePasswordChange} 
                    />
                    <button 
                        type="button" 
                        className="show-password-btn" 
                        onClick={handleShowPasswordToggle}
                    >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>
                <button type="submit" className="login-button">Login</button>
                <a href="#" className="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</a>
                <div className="separator">
                    <div className="line"></div>
                    <div className="or-text">OR</div>
                    <div className="line"></div>
                </div>
                <button type="button" className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
            </form>
            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
}

export default LoginPageA;
