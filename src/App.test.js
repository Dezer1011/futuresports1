import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Mock child components to isolate the App component testing
jest.mock('./components/NavBar/NavBar', () => () => <div data-testid="navbar">NavBar</div>);
jest.mock('./components/Home/Home', () => () => <div data-testid="home">Home</div>);
jest.mock('./components/Gallery/Gallery', () => () => <div data-testid="gallery">Gallery</div>);
jest.mock('./components/Video/Video', () => () => <div data-testid="video">Video</div>);
jest.mock('./components/SignUp/SignUp', () => () => <div data-testid="signup">SignUp</div>);
jest.mock('./components/News/News', () => () => <div data-testid="news">News</div>);
jest.mock('./components/Weather/Weather', () => () => <div data-testid="weather">Weather</div>);
jest.mock('./components/PlayerStats/PlayerStats', () => () => <div data-testid="playerstats">PlayerStats</div>);
jest.mock('./components/UpcomingMatches/UpcomingMatches', () => () => <div data-testid="upcomingmatches">UpcomingMatches</div>);
jest.mock('./components/About/About', () => () => <div data-testid="about">About</div>);
jest.mock('./components/Comments/Comments', () => () => <div data-testid="comments">Comments</div>);
jest.mock('./components/Footer/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('App Component', () => {

    // Mocking localStorage
    let getItemSpy, clearSpy;

    beforeEach(() => {
        getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
        clearSpy = jest.spyOn(Storage.prototype, 'clear');

        getItemSpy.mockImplementation(() => JSON.stringify({isLoggedIn: true, username: 'test', password: 'pass'}));
    });

    afterEach(() => {
        getItemSpy.mockRestore();
        clearSpy.mockRestore();
    });
    
    it('renders without crashing', () => {
        render(<App />);
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('home')).toBeInTheDocument();
        expect(screen.getByTestId('gallery')).toBeInTheDocument();
        expect(screen.getByTestId('video')).toBeInTheDocument();
        expect(screen.getByTestId('signup')).toBeInTheDocument();
        expect(screen.getByTestId('news')).toBeInTheDocument();
        expect(screen.getByTestId('weather')).toBeInTheDocument();
        expect(screen.getByTestId('playerstats')).toBeInTheDocument();
        expect(screen.getByTestId('upcomingmatches')).toBeInTheDocument();
        expect(screen.getByTestId('about')).toBeInTheDocument();
        expect(screen.getByTestId('comments')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('initializes user from local storage', () => {
        render(<App />);
        expect(getItemSpy).toHaveBeenCalledWith('currentUser');
    });

    it('clears local storage on window unload', () => {
        render(<App />);
        window.dispatchEvent(new Event('beforeunload'));
        expect(clearSpy).toHaveBeenCalled();
    });
    
});
