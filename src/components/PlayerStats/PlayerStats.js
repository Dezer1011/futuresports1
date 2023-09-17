// Importing necessary React hooks.
import React, { useEffect, useState } from 'react';
import './PlayerStats.css';

// Pre-defined list of player names.
const names = [
    'John Smith', 'Emily Johnson', 'Robert Brown', 'Lucy Miller', 
    'James Wilson', 'Sarah Taylor', 'William Davis', 'Karen Clark', 
    'David Thomas', 'Sophia Lewis'
];

// Pre-defined list of sports, each corresponding to a player from the names array.
const sports = [
    'Swimming', 'Running', 'Gymnastics', 'Tennis', 'Soccer', 
    'Basketball', 'Hockey', 'Cycling', 'Golf', 'Volleyball'
];

function PlayerStats() {
    // State to manage the list of players and their details.
    const [players, setPlayers] = useState([]);

    // Using the useEffect hook to execute logic after component mount.
    useEffect(() => {
        // Function to update players with random medals and associated sports.
        const updatePlayers = () => {
            const updatedPlayers = names.map((name, index) => ({
                name: name,
                // Generating a random number of medals for each player.
                medals: Math.floor(Math.random() * 22),
                sport: sports[index]
            }));
            setPlayers(updatedPlayers);
        };

        // Initial update of player stats.
        updatePlayers();
        // Setting an interval to update player stats every 5 seconds.
        const interval = setInterval(updatePlayers, 5000);

        // Cleanup function: clear the interval.
        return () => clearInterval(interval);
    }, []);

    // Rendering the player statistics in a table format.
    return (
        <section id="player-stats">
            <h2>Player Statistics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Medals</th>
                        <th>Sport</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping through players to generate table rows for each one. */}
                    {players.map((player, index) => (
                        <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.medals}</td>
                            <td>{player.sport}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default PlayerStats;

