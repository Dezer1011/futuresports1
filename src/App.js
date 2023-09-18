// Import React and required hooks
import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css'; 
import { BrowserRouter as Router } from 'react-router-dom';

// Import components for the different sections of the application
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Gallery from './components/Gallery/Gallery';
import Video from './components/Video/Video';
import SignUp from './components/SignUp/SignUp';
import News from './components/News/News';
import Weather from './components/Weather/Weather';
import PlayerStats from './components/PlayerStats/PlayerStats';
import UpcomingMatches from './components/UpcomingMatches/UpcomingMatches';
import About from './components/About/About';
import Comments from './components/Comments/Comments';
import Footer from './components/Footer/Footer';

// Create a context for managing user-related data and functions throughout the application
export const UserContext = React.createContext({
  users: [],
  currentUser: null,
  addUser: () => {},
  setCurrentUser: () => {}
});

function App() {
  // State to manage the currently logged in user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {isLoggedIn: false, username: '', password: ''});

  // State to manage a list of users
  const [users, setUsers] = useState([]);

  // Function to add a new user to the users state
  const addUser = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  }

  useEffect(() => {
    // Function to clear local storage
    const handleBeforeUnload = () => {
        localStorage.clear();
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []);

  return (
    // Set up routing and user context for the application
    <Router>
      <UserContext.Provider value={{ users, currentUser: user, addUser, setCurrentUser: setUser }}>
        <div className="App">
            <NavBar />  

            <Home />
            <Gallery />
            <Video />
            <SignUp />
            <News />
            <Weather />
            <PlayerStats />
            <UpcomingMatches />
            <About />
            <Comments />

            <Footer />  
        </div>
      </UserContext.Provider>
    </Router>
  );
}
export default App;  
