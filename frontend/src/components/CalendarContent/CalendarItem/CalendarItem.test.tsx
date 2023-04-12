import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../test-utils/test-utils';
import { screen } from '@testing-library/react';
import CalendarItem from './CalendarItem';

describe('<CalendarItem />', () => {
	test('it should mount', () => {
		render(<CalendarItem />);

		const calendarItem = screen.getByTestId('CalendarItem');
		expect(calendarItem).toBeInTheDocument();
	});
});
