import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../../App';
import Login from './Login';

describe('Login Component', () => {
    const users = [
        { username: 'testUser', password: 'testPass', isLoggedIn: false }
    ];

    const setCurrentUser = jest.fn();

    beforeEach(() => {
        render(
            <MemoryRouter>
                <UserContext.Provider value={{ users, setCurrentUser }}>
                    <Login />
                </UserContext.Provider>
            </MemoryRouter>
        );
    });

    it('renders the login form', () => {
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    });

    it('updates input values on change', () => {
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testUser' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'testPass' } });
        
        expect(screen.getByPlaceholderText(/username/i).value).toBe('testUser');
        expect(screen.getByPlaceholderText(/password/i).value).toBe('testPass');
    });

    it('handles a successful login', () => {
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testUser' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'testPass' } });
        
        const mockedAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: /login/i }));
        });
        
        expect(mockedAlert).toHaveBeenCalledWith("Logged in successfully!");
        expect(setCurrentUser).toHaveBeenCalledWith({ username: 'testUser', password: 'testPass', isLoggedIn: true });

        mockedAlert.mockRestore();
    });

    it('handles a failed login', () => {
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'wrongUser' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongPass' } });
        
        const mockedAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: /login/i }));
        });

        expect(mockedAlert).toHaveBeenCalledWith("Incorrect credentials or you need to sign up first.");
        mockedAlert.mockRestore();
    });
});
