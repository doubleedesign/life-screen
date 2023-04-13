import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../test-utils/test-utils';
import { screen } from '@testing-library/react';
import Date from './Date';

describe('<Date />', () => {
	test('it should mount', () => {
		render(<Date />);

		const date = screen.getByTestId('Date');
		expect(date).toBeInTheDocument();
	});
});
