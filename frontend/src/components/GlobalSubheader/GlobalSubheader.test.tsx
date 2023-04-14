import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../test-utils/test-utils';
import { screen } from '@testing-library/react';
import GlobalSubheader from './GlobalSubheader';

describe('<GlobalSubheader />', () => {
	test('it should mount', () => {
		render(<GlobalSubheader />);

		const globalSubheader = screen.getByTestId('GlobalSubheader');
		expect(globalSubheader).toBeInTheDocument();
	});
});
