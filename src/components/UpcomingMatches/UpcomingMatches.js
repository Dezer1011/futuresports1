// Import necessary React hooks.
import React, { useEffect, useState } from 'react';
import './UpcomingMatches.css';

// An array representing different types of sports.
const sports = [
    'Swimming', 'Running', 'Gymnastics', 'Tennis', 'Soccer', 
    'Basketball', 'Hockey', 'Cycling', 'Golf', 'Volleyball'
];

// An array representing the states of Australia.
const states = [
    "Sydney", "Melbourne", "Brisbane", "Adelaide", 
    "Perth", "Hobart", "Darwin", "Canberra"
];

function UpcomingMatches() {
    // State to manage the upcoming matches.
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        // Function to generate a list of random upcoming matches.
        const updateMatches = () => {
            const upcomingMatches = [];
            for (let i = 0; i < 5; i++) {
                // Generate a random date within the next 30 days.
                const randomDate = new Date();
                randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30));

                // Push a match with random sport, state, and date to the upcomingMatches array.
                upcomingMatches.push({
                    sport: sports[Math.floor(Math.random() * sports.length)],
                    state: states[Math.floor(Math.random() * states.length)],
                    date: randomDate.toDateString()
                });
            }
            // Update the state with the new list of matches.
            setMatches(upcomingMatches);
        };

        // Call the function to populate the initial set of matches.
        updateMatches();
        // Set up an interval to update the matches every 10 seconds.
        const interval = setInterval(updateMatches, 10000);

        // Clean up the interval when the component is unmounted.
        return () => clearInterval(interval);
    }, []);

    // Render the component.
    return (
        <section id="upcoming-matches">
            <h2>Upcoming Matches</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sport</th>
                        <th>State</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/*render a table row for each match. */}
                    {matches.map((match, index) => (
                        <tr key={index}>
                            <td>{match.sport}</td>
                            <td>{match.state}</td>
                            <td>{match.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default UpcomingMatches;
