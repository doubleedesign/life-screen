import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../test-utils/test-utils';
import { screen } from '@testing-library/react';
import CalendarContent from './CalendarContent';

describe('<CalendarContent />', () => {
	test('it should mount', () => {
		render(<CalendarContent />);

		const calendarContent = screen.getByTestId('CalendarContent');
		expect(calendarContent).toBeInTheDocument();
	});
});
