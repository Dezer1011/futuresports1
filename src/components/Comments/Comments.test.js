import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { UserContext } from '../../App';
import Comments from './Comments';

describe('Comments component', () => {
    it('renders Comments header', () => {
        const { getByText } = render(<Comments />);
        const header = getByText(/Comments/i);
        expect(header).toBeInTheDocument();
    });

    it('shows textarea for logged-in user', () => {
        const user = { username: 'JohnDoe', isLoggedIn: true };

        const { getByPlaceholderText } = render(
            <UserContext.Provider value={{ currentUser: user }}>
                <Comments />
            </UserContext.Provider>
        );

        const textarea = getByPlaceholderText('Add a comment...');
        expect(textarea).toBeInTheDocument();
    });

    it('asks non-logged-in users to log in', async () => {
        const { findByText } = render(<Comments />);
        const prompt = await findByText((content, element) => 
          content.startsWith('Please') && 
          element.tagName.toLowerCase() === 'p'
        );
        expect(prompt).toBeInTheDocument();
      });

    it('adds a comment to the list when submitted by a logged-in user', () => {
        const user = { username: 'JohnDoe', isLoggedIn: true };
        const { getByPlaceholderText, getByText } = render(
            <UserContext.Provider value={{ currentUser: user }}>
                <Comments />
            </UserContext.Provider>
        );

        const textarea = getByPlaceholderText('Add a comment...');
        const button = getByText('Post Comment');

        act(() => {
            fireEvent.change(textarea, { target: { value: 'A new comment' } });
            fireEvent.click(button);
        });

        const comment = getByText(/A new comment/i);
        expect(comment).toBeInTheDocument();
    });
});
