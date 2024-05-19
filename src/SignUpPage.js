import React, { useState } from 'react';
import './components/SignUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleTermsChange = () => {
        setAcceptedTerms(!acceptedTerms);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!acceptedTerms) {
            alert('Please accept the terms and conditions.');
            return;
        }

        const formData = {
            username,
            email,
            password,
        };

        try {
            const response = await axios.post('https://recruitment-portal-l0n5.onrender.com/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

                console.log('Form submitted successfully!');
                navigate('/AuthPage');
         
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // Set the server error message in state
                setServerError(error.response.data.message);
                console.error('Server error:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request error:', error.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="brand-text">IKUSASATECH</div>
            <div className="heading">
                <h2>Create Account</h2>
            </div>
            <div className="registration-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group terms-conditions">
                        <label htmlFor="terms">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                checked={acceptedTerms}
                                onChange={handleTermsChange}
                                required
                            />
                            &nbsp;I accept the <span className="terms-link">Terms and Conditions</span>
                        </label>
                    </div>
                    <div className="form-group">
                        <button type="submit">Submit</button>
                    </div>
                    {serverError && <div className="error-message">{serverError}</div>}
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
