import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook from react-router-dom for navigation
import { post } from "../../services/ajax.service"; // Import the post method from a custom AJAX service to handle HTTP POST requests
import { useAuth } from "../../context/AuthContext"; // Import useAuth custom hook to get access to the authentication context
import setAuthToken from "../../utils/setAuthToken"; // Utility function to set the authentication token in headers or local storage
import './login.scss'; // Import CSS for styling

function Login(props) {
    // State hooks for username and password inputs
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');

    // Hook to allow navigation programmatically
    const navigate = useNavigate();
    // Extract the login function from the auth context
    const { login } = useAuth();

    // Event handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            // Send a POST request to the login API endpoint
            const getLogin = await post("/api/auth/login", { username, password });
            const { accessToken } = getLogin?.data?.data; // Destructure to get accessToken from response data

            login(accessToken); // Use context's login function to update the global state
            setAuthToken(accessToken); // Set the received accessToken for future requests
            navigate("/file"); // Navigate to the home route on successful login
        } catch (err) {
            console.log(err); // Log any errors that occur during the login process
        }
    };

    return (
        <div className='animation-gradient'>
           
            <div className="login-container">
                <div className='header-align'>
                <h1 className='bottom-margin'>Image To PDF Converter</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Login</h2> {/* Login form header */}
                        <div className="input-group">
                            <label htmlFor="username">Username</label> {/* Username input field */}
                            <input
                                type="text"
                                id="username"
                                placeholder='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Update state on user input
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label> {/* Password input field */}
                            <input
                                type="password"
                                id="password"
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Update state on user input
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Log In</button> {/* Submit button */}
                    </form>
                </div>
            </div>
        </div>
        

    );
}

export default Login;
