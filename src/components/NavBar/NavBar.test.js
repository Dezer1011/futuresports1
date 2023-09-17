import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { UserContext } from '../../App';
import NavBar from './NavBar';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter as Router } from 'react-router-dom'; 

describe('NavBar Component', () => {
    let mockSetUser;
    let user;

    beforeEach(() => {
        mockSetUser = jest.fn();
        user = { isLoggedIn: false };
        
        render(
            <Router> 
                <UserContext.Provider value={{ user, setUser: mockSetUser }}>
                    <NavBar />
                </UserContext.Provider>
            </Router>
        );
    });

    it('renders FutureSports brand', () => {
        expect(screen.getByText('FutureSports')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        const links = ['Home', 'Gallery', 'Video', 'News', 'Weather', 'Player Stats', 'Upcoming Matches', 'Comments', 'About'];
        links.forEach(link => {
            expect(screen.getByText(link)).toBeInTheDocument();
        });
    });

    it('renders the search input and button', () => {
        expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('updates the search input value on change', () => {
        fireEvent.change(screen.getByPlaceholderText(/search.../i), { target: { value: 'video' } });
        expect(screen.getByPlaceholderText(/search.../i).value).toBe('video');
    });

    it('alerts the user if the section is not found', () => {
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.change(screen.getByPlaceholderText(/search.../i), { target: { value: 'non-existent-section' } });
        fireEvent.click(screen.getByText('Search'));
        expect(spy).toHaveBeenCalledWith('Section not found!');
        spy.mockRestore();
    });

    it('renders the login button when user is not logged in', () => {
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('renders the login component when login button is clicked', () => {
        fireEvent.click(screen.getByText('Login'));
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    });

});

