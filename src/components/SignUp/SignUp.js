// Importing necessary React hooks and context.
import React, { useState, useContext } from 'react';
// Importing the UserContext from the App component to access user-related data and actions.
import { UserContext } from '../../App';
import './SignUp.css';

function SignUp() {
    // Using the UserContext to retrieve the list of users and the addUser function.
    const { users, addUser } = useContext(UserContext);
    // Local state to manage the username and password input fields.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle user sign-up.
    const handleSignUp = () => {
        // Ensure both fields are filled out.
        if (username && password) {
            // Check if the username already exists.
            if (users.some(u => u.username === username)) {
                alert("Username already exists. Please login.");
                return;
            }

            // Create a new user object.
            const newUser = { username: username, password: password };
            // Add the new user using the context's addUser function.
            addUser(newUser);

            // Update local storage with the new user.
            localStorage.setItem('users', JSON.stringify([...users, newUser]));

            alert("Signed up successfully!");
        } else {
            // Alert if one or both fields are empty.
            alert("Please fill out both fields");
        }
    };

    // Rendering the SignUp form.
    return (
        <section className="signup-section">
            <h2>Sign Up</h2>
            <div className="signup-form">
                {/* Input field for username */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {/* Input field for password */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* Button to trigger the sign-up process */}
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        </section>
    );
}

export default SignUp;

