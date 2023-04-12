import React, { FC, useContext } from 'react';
import { CalendarEvent } from '../../../types';
import { CalendarContext } from '../../../CalendarContext';
import { CalendarItemContent, CalendarItemImage, CalendarItemWrapper } from './CalendarItem.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CalendarItemProps {
	event: CalendarEvent
}

const CalendarItem: FC<CalendarItemProps> = ({ event }) => {
	const { calendars }  = useContext(CalendarContext);
	const calendar = calendars.find((calendar) => calendar.id === event.calendar_id);

	console.log(event);

	return (
		<CalendarItemWrapper data-testid="CalendarItem" colors={calendar?.colors}>
			<CalendarItemImage  colors={calendar?.colors}>
				{calendar?.logo ? <img src={`/images/${calendar.logo}`} alt="" className={`icon-${calendar.logo.replace('.svg', '')}`} /> : <FontAwesomeIcon icon={['fas', 'calendar-star']} /> }
			</CalendarItemImage>
			<CalendarItemContent colors={calendar?.colors}>
				<h3>{event.what}</h3>
			</CalendarItemContent>
		</CalendarItemWrapper>
	);
};

export default CalendarItem;
