// Importing necessary React hooks and components.
import React, { useState, useContext } from 'react';
// Importing the UserContext to get and set the currently logged-in user.
import { UserContext } from '../../App';
// useNavigate hook is used to programmatically navigate to routes.
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Functional component for the Login page.
function Login() {
    // Fetching users and the function to set the current user from UserContext.
    const { users, setCurrentUser } = useContext(UserContext);
    // State for managing the inputted username.
    const [username, setUsername] = useState('');
    // State for managing the inputted password.
    const [password, setPassword] = useState('');
    // Initializing the useNavigate hook to programmatically navigate after successful login.
    const navigate = useNavigate();

    // Handler function for login.
    const handleLogin = () => {
        // Checking if the entered username and password match any user in our users array.
        const foundUser = users.find(u => u.username === username && u.password === password);
    
        if (foundUser) {
            // If user is found, mark them as logged in and update the context.
            const loggedInUser = { ...foundUser, isLoggedIn: true };
            setCurrentUser(loggedInUser);
    
            // Storing the logged-in user in local storage for persistence.
            localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    
            // Alerting the user of a successful login.
            alert("Logged in successfully!");
            // Redirecting the user to the home page after successful login.
            navigate('/'); 
        } else {
            // If credentials don't match any user, alert the user.
            alert("Incorrect credentials or you need to sign up first.");
        }
    };

    // Rendering the login form.
    return (
        <section className="login-section">
            <div className="login-section-content">
                <h2>Login</h2>
                <div className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        // Update username state every time the user types in the input field.
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        // Update password state every time the user types in the input field.
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </section>
    );
}

export default Login;



