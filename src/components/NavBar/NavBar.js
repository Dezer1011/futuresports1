// Importing necessary React hooks and components.
import React, { useState, useContext } from 'react';
// Importing the UserContext to get and set the currently logged-in user.
import { UserContext } from '../../App';
// Importing ScrollLink from react-scroll to enable smooth scrolling to sections.
import { Link as ScrollLink } from 'react-scroll';  
// Importing the Login component to be used in this navigation bar.
import Login from '../Login/Login';
import './NavBar.css';

// Functional component for the Navigation Bar.
function NavBar() {
    // Fetching user and the function to set the user from UserContext.
    const { user } = useContext(UserContext);
    // State for managing the search input value.
    const [searchValue, setSearchValue] = useState("");
    // State for managing the visibility of the login form.
    const [showLogin, setShowLogin] = useState(false);

    // Handler function for the search operation.
    const handleSearch = () => {
        // Checking if there's a section with the ID equal to the search value.
        if (document.getElementById(searchValue)) {
            // If found, navigate to that section.
            window.location.hash = searchValue; 
        } else {
            // If not found, alert the user.
            alert("Section not found!");
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                FutureSports
            </div>
            <div className="navbar-links">
                {/* Navigation links that scroll smoothly to corresponding sections on the page. */}
                <ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink>
                <ScrollLink to="gallery" smooth={true} duration={500}>Gallery</ScrollLink>
                <ScrollLink to="video" smooth={true} duration={500}>Video</ScrollLink>
                <ScrollLink to="news" smooth={true} duration={500}>News</ScrollLink>
                <ScrollLink to="weather" smooth={true} duration={500}>Weather</ScrollLink>
                <ScrollLink to="player-stats" smooth={true} duration={500}>Player Stats</ScrollLink>
                <ScrollLink to="upcoming-matches" smooth={true} duration={500}>Upcoming Matches</ScrollLink>
                <ScrollLink to="comments" smooth={true} duration={500}>Comments</ScrollLink>
                <ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink>
                
                {/* Conditionally render the Login component if showLogin state is true. */}
                {!user?.isLoggedIn ? <button onClick={() => setShowLogin(!showLogin)}>Login</button> : null}
            </div>
            {showLogin && <Login />}
            <div className="navbar-search">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)} 
                />
                {/* Search button to trigger the handleSearch function. */}
                <button onClick={handleSearch}>Search</button>
            </div>
        </nav>
    )
}

export default NavBar;
