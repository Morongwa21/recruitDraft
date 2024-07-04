import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/LoginA.css';
import logo from './company logo.jpg';
import axios from 'axios'; 
axios.defaults.withCredentials = true;
const LoginPageA = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        alert('Please enter your email and password.');
        return;
      }
  
      try {
        const response = await axios.post('https://recruitment-portal-l0n5.onrender.com/login', {
          email: email,
          password: password
        });
  
        if (response.status === 200) {
          console.log('Login response:', response.data);
  
          const { token } = response.data; 
          localStorage.setItem('token', token);
  console.log('token: ', token)
          const userResponse = await axios.get('https://recruitment-portal-l0n5.onrender.com/user/me', {
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
              navigate('/ProfileUsers');
            }
          } else {
            alert('Failed to fetch user details.');
          }
        } else {
          alert('Login failed. Please check your credentials and try again.');
        }
      } catch (error) {
        console.error('Error during login:', error.message);
        alert('An error occurred during login. Please try again later.');
      }
    };
  return (
    <div className="login-page">
            <div className="login-logo">
        <img src={logo} alt="Company Logo" />
    </div>
    <div className="gradient-lines">
        <div className="gradient-line"></div>
        <div className="gradient-line"></div>
      </div>
      <div className="login-heading">
      
      <h2>Login</h2>
      </div>
      <form className="login-container" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
          <input 
            type="text" 
            id="email" 
            placeholder="Email" 
            className="Login-input-field" 
            value={email} 
            onChange={handleEmailChange} 
          />
 <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Password" 
            className="Login-input-field" 
            value={password} 
            onChange={handlePasswordChange} 
          />
          <button type="submit" className="login-button">Login</button>
          <a href="#" className="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</a>
        <div className="separator">
          <div className="line"></div>
          <div className="or-text">OR</div>
          <div className="line"></div>
        </div>
        <button type="button" className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
        </form>
      </div>

  );
}

export default LoginPageA;

