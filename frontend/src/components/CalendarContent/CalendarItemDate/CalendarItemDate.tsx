import React, { FC } from 'react';
import { CalendarItemDateWrapper } from './CalendarItemDate.styled';

interface CalendarItemDateProps {
	date: Date;
	colors?: {
		primary: string,
		secondary: string
	}
}

const CalendarItemDate: FC<CalendarItemDateProps> = ({ date, colors }) => {

	return (
		<CalendarItemDateWrapper data-testid="Date" colors={colors}>
			<span className="day">
				{new Date(date).toLocaleString('en-au', { weekday: 'short' })}
			</span>
			<span className="date">{new Date(date).getDate()}</span>
			<span className="month">{new Date(date).toLocaleString('en-au', { month: 'long' })}</span>
		</CalendarItemDateWrapper>
	);
};

export default CalendarItemDate;
