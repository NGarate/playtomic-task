import React from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';

test('It renders the Sign In button', () => {
    render(<SignIn />);
    const buttonElement = screen.getByText(/Sign In/i);
    expect(buttonElement).toBeInTheDocument();
});
