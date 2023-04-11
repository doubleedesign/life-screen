import React, { FC, useContext } from 'react';
import { CalendarContentWrapper } from './CalendarContent.styled';
import { CalendarContext } from '../../CalendarContext';

interface CalendarContentProps {
}

const CalendarContent: FC<CalendarContentProps> = () => {
	const { selectedCalendars } = useContext(CalendarContext);

	return (
		<CalendarContentWrapper data-testid="CalendarContent">
			CalendarContent Component
		</CalendarContentWrapper>
	);
};

export default CalendarContent;
