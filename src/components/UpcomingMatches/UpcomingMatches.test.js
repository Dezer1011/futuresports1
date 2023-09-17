import React from 'react';
import { render, screen, act } from '@testing-library/react';
import UpcomingMatches from './UpcomingMatches';

jest.useFakeTimers();

describe('UpcomingMatches Component', () => {

    beforeEach(() => {
        render(<UpcomingMatches />);
    });

    it('renders the Upcoming Matches heading', () => {
        expect(screen.getByText('Upcoming Matches')).toBeInTheDocument();
    });

    it('renders the table headers', () => {
        expect(screen.getByText('Sport')).toBeInTheDocument();
        expect(screen.getByText('State')).toBeInTheDocument();
        expect(screen.getByText('Date')).toBeInTheDocument();
    });

    it('initially renders five upcoming matches', () => {
        expect(screen.getAllByRole('row')).toHaveLength(6); 
    });

    it('each match row displays a sport, state, and date', () => {
        const rows = screen.getAllByRole('row').slice(1); 
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            expect(cells).toHaveLength(3);
            expect(cells[0].textContent).toBeTruthy();
            expect(cells[1].textContent).toBeTruthy();
            expect(cells[2].textContent).toBeTruthy();
        });
    });

    it('updates the list of matches after 10 seconds', async () => {
        const initialFirstRow = screen.getAllByRole('row')[1].textContent;

        act(() => {
            jest.advanceTimersByTime(10000);
        });

        const updatedFirstRow = screen.getAllByRole('row')[1].textContent;
        expect(initialFirstRow).not.toBe(updatedFirstRow);
    });

    it('populates matches with values from the sports and states arrays', () => {
        const sports = [
            'Swimming', 'Running', 'Gymnastics', 'Tennis', 'Soccer', 
            'Basketball', 'Hockey', 'Cycling', 'Golf', 'Volleyball'
        ];

        const states = [
            "Sydney", "Melbourne", "Brisbane", "Adelaide", 
            "Perth", "Hobart", "Darwin", "Canberra"
        ];

        const rows = screen.getAllByRole('row').slice(1); 
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            expect(sports).toContain(cells[0].textContent);
            expect(states).toContain(cells[1].textContent);
        });
    });

    it('populates matches with a valid date within 30 days', () => {
        const today = new Date();
        const thirtyDaysLater = new Date();
        thirtyDaysLater.setDate(today.getDate() + 30);

        const rows = screen.getAllByRole('row').slice(1); 
        rows.forEach(row => {
            const dateCell = new Date(row.querySelectorAll('td')[2].textContent);
            expect(dateCell >= today && dateCell <= thirtyDaysLater).toBeTruthy();
        });
    });

});

