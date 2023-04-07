import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../test-utils/test-utils';
import { screen } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
	test('it should mount', () => {
		render(<Checkbox />);

		const checkbox = screen.getByTestId('Checkbox');
		expect(checkbox).toBeInTheDocument();
	});
});
