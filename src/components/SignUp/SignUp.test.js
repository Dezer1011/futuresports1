import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';
import { UserContext } from '../../App';

describe('SignUp Component', () => {
    let mockAddUser;
    let users;

    beforeEach(() => {
        mockAddUser = jest.fn();
        users = [
            { username: 'existingUser', password: 'existingPassword' }
        ];

        render(
            <UserContext.Provider value={{ users, addUser: mockAddUser }}>
                <SignUp />
            </UserContext.Provider>
        );
    });

    it('renders the SignUp form', () => {
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument(); 
    });

    it('updates input values on change', () => {
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'newUser' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'newPassword' } });

        expect(screen.getByPlaceholderText(/username/i).value).toBe('newUser');
        expect(screen.getByPlaceholderText(/password/i).value).toBe('newPassword');
    });

    it('handles a successful sign-up', () => {
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testUser' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'testPassword' } });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i })); 

        expect(spy).toHaveBeenCalledWith('Signed up successfully!');
        expect(mockAddUser).toHaveBeenCalledWith({ username: 'testUser', password: 'testPassword' });

        spy.mockRestore();
    });

    it('alerts user if username already exists', () => {
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'existingUser' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'newPassword' } });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i })); 

        expect(spy).toHaveBeenCalledWith('Username already exists. Please login.');

        spy.mockRestore();
    });

    it('alerts user if fields are empty', () => {
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        fireEvent.click(screen.getByRole('button', { name: /sign up/i })); 

        expect(spy).toHaveBeenCalledWith('Please fill out both fields');

        spy.mockRestore();
    });
});
