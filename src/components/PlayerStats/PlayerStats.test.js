import React from 'react';
import { render, screen, act } from '@testing-library/react';
import PlayerStats from './PlayerStats';

jest.useFakeTimers();

describe('PlayerStats Component', () => {

    beforeEach(() => {
        render(<PlayerStats />);
    });

    it('renders without crashing', () => {
        expect(screen.getByText(/Player Statistics/)).toBeInTheDocument();
    });

    it('displays the correct table headers', () => {
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Medals')).toBeInTheDocument();
        expect(screen.getByText('Sport')).toBeInTheDocument();
    });

    it('populates the table with players and their data', () => {
        const names = [
            'John Smith', 'Emily Johnson', 'Robert Brown', 'Lucy Miller', 
            'James Wilson', 'Sarah Taylor', 'William Davis', 'Karen Clark', 
            'David Thomas', 'Sophia Lewis'
        ];

        names.forEach(name => {
            const row = screen.getByText(name).closest('tr');
            expect(row).toBeInTheDocument();
            
            // Check that the number of medals is between 0 and 21
            const medalCell = row.cells[1];
            expect(+medalCell.textContent).toBeGreaterThanOrEqual(0);
            expect(+medalCell.textContent).toBeLessThanOrEqual(21);
        });
    });

    it('updates player stats every 5 seconds', () => {
        const originalFirstPlayerMedals = screen.getByText('John Smith').closest('tr').cells[1].textContent;

        // Simulate 5 seconds
        act(() => {
            jest.advanceTimersByTime(5000);
        });

        const updatedFirstPlayerMedals = screen.getByText('John Smith').closest('tr').cells[1].textContent;

        // Given the randomness, this could occasionally fail, but it's very unlikely.
        expect(updatedFirstPlayerMedals).not.toBe(originalFirstPlayerMedals);
    });
});
