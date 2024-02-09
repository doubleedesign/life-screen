import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GlobalHeader from './GlobalHeader';

describe('<GlobalHeader />', () => {
  test('it should mount', () => {
    render(<GlobalHeader />);
    
    const globalHeader = screen.getByTestId('GlobalHeader');

    expect(globalHeader).toBeInTheDocument();
  });
});