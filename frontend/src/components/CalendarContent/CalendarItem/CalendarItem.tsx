import React, { FC, MouseEvent, useCallback, useContext } from 'react';
import { CalendarEvent } from '../../../types';
import { CalendarContext } from '../../../CalendarContext';
import { CalendarItemContent, CalendarItemImage, CalendarItemWrapper } from './CalendarItem.styled';
import CalendarItemDate from '../CalendarItemDate/CalendarItemDate';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledIconButton } from '../../Button/Button.styled';
import { ScreenReaderText } from '../../common';
import CalendarItemTime from '../CalendarItemTime/CalendarItemTime';

interface CalendarItemProps {
	event: CalendarEvent
}

const CalendarItem: FC<CalendarItemProps> = ({ event }) => {
	const { calendars, setHiddenSeries }  = useContext(CalendarContext);
	// Find which calendar this event belongs to
	const calendar = calendars.find((calendar) => calendar.id === event.calendarId);

	const hideSeries = useCallback(() => {
		setHiddenSeries((prevState) => [...prevState, event.seriesMasterId]);
	}, [event.seriesMasterId]);

	return (
		<CalendarItemWrapper data-testid="CalendarItem" colors={calendar?.colors}>
			<CalendarItemDate date={event.when.start.dateTime} colors={calendar?.colors}/>
			<CalendarItemTime start={event.when.start.dateTime} end={event.when?.end?.dateTime} colors={calendar?.colors} />
			<CalendarItemImage colors={calendar?.colors}>
				{calendar?.logo ? <img src={`/images/${calendar.logo}`} alt="" className={`icon-${calendar.logo.replace('.svg', '')}`} /> : <FontAwesomeIcon icon={['fas', 'calendar-star']} /> }
			</CalendarItemImage>
			<CalendarItemContent colors={calendar?.colors}>
				<h3>
					{event.what}
					{event.type === 'occurrence' &&
						<>
							<span className="react-tooltip-trigger"
								data-tooltip-id={`EventTooltip-${event.what.replace(' ', '')}`}
								data-tooltip-content="Recurring event"
								data-tooltip-place="bottom"
								data-tooltip-delay-hide={200}
							>
								<FontAwesomeIcon icon={['fas', 'arrows-rotate']} />
							</span>
							<Tooltip id={`EventTooltip-${event.what.replace(' ', '')}`} />
						</>
					}
				</h3>
				{event.where.displayName && <p>{event.where.displayName}</p>}
			</CalendarItemContent>
			{event.type === 'occurrence' && event.seriesMasterId &&
				<>
					<StyledIconButton color="light" onClick={hideSeries}>
						<span className="react-tooltip-trigger"
							data-tooltip-id={`HideSeriesTooltip-${event.seriesMasterId}`}
							data-tooltip-content="Hide this series"
							data-tooltip-place="bottom"
							data-tooltip-delay-hide={200}
						>
							<FontAwesomeIcon icon={['fas', 'eye-slash']} />
						</span>
						<ScreenReaderText>Hide this series</ScreenReaderText>
						<Tooltip id={`HideSeriesTooltip-${event.seriesMasterId}`} />
					</StyledIconButton>
				</>
			}
		</CalendarItemWrapper>
	);
};

export default CalendarItem;
