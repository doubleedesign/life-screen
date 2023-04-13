import React, { FC, MouseEvent, useCallback, useContext } from 'react';
import { CalendarEvent } from '../../../types';
import { CalendarContext } from '../../../CalendarContext';
import { CalendarItemContent, CalendarItemImage, CalendarItemWrapper } from './CalendarItem.styled';
import CalendarItemDate from '../CalendarItemDate/CalendarItemDate';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CalendarItemProps {
	event: CalendarEvent
}

const CalendarItem: FC<CalendarItemProps> = ({ event }) => {
	const { calendars }  = useContext(CalendarContext);
	const calendar = calendars.find((calendar) => calendar.id === event.calendar_id);

	const tooltipFade = useCallback((event: MouseEvent<HTMLSpanElement>) => {
		if(event.type === 'mouseenter') {
			event.currentTarget.classList.remove('react-tooltip-trigger__fadeOut');
			event.currentTarget.classList.add('react-tooltip-trigger__fadeIn');
		}
		else if(event.type === 'mouseleave') {
			event.currentTarget.classList.add('react-tooltip-trigger__fadeOut');
			event.currentTarget.classList.remove('react-tooltip-trigger__fadeIn');
		}
	}, []);

	return (
		<CalendarItemWrapper data-testid="CalendarItem" colors={calendar?.colors}>
			<CalendarItemDate date={event.when.start.dateTime} colors={calendar?.colors}/>
			<CalendarItemImage colors={calendar?.colors}>
				{calendar?.logo ? <img src={`/images/${calendar.logo}`} alt="" className={`icon-${calendar.logo.replace('.svg', '')}`} /> : <FontAwesomeIcon icon={['fas', 'calendar-star']} /> }
			</CalendarItemImage>
			<CalendarItemContent colors={calendar?.colors}>
				<h3>{event.what}</h3>
				{event.type === 'occurrence' &&
					<>
						<span className="react-tooltip-trigger"
							data-tooltip-id={`EventTooltip-${event.what.replace(' ', '')}`}
							data-tooltip-content="Recurring event"
							data-tooltip-place="bottom"
							data-tooltip-delay-hide={400}
							onMouseLeave={tooltipFade}
							onMouseEnter={tooltipFade}
						>
							<FontAwesomeIcon icon={['fas', 'arrows-rotate']} />
						</span>
						<Tooltip id={`EventTooltip-${event.what.replace(' ', '')}`} />
					</>}
				{event.where.displayName && <p>{event.where.displayName}</p>}
			</CalendarItemContent>
		</CalendarItemWrapper>
	);
};

export default CalendarItem;
