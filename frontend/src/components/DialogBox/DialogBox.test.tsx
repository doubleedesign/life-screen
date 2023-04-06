import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DialogBox from './DialogBox';

describe('<DialogBox />', () => {
  test('it should mount', () => {
    render(<DialogBox />);
    
    const dialogBox = screen.getByTestId('DialogBox');

    expect(dialogBox).toBeInTheDocument();
  });
});