import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';

test('It render menu links', () => {
  render(<MainPage />);
  
  const dashboardLink = screen.getByText(/Dashboard/i);
  const settingsLink = screen.getByText(/Settings/i);
  
  expect(dashboardLink).toBeInTheDocument();
  expect(settingsLink).toBeInTheDocument();
});

test('It renders the toolbar', () => {
  render(<MainPage />);
  
  const toolbar = screen.getByText(/Playtomic task/i);
  
  expect(toolbar).toBeInTheDocument();
});
