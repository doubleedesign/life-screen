import React, { FC, useContext, useState, useEffect, useCallback } from 'react';
import {
	CalendarContentWrapper,
	CalendarItemList
} from './CalendarContent.styled';
import { CalendarContext } from '../../CalendarContext';
import CalendarItem from './CalendarItem/CalendarItem';
import { CalendarEvent } from '../../types';
import { Block } from '../common';

interface SortedEvents {
	due_dates: CalendarEvent[];
	other: CalendarEvent[];
}

const CalendarContent: FC = () => {
	const { calendars, events, refreshEvents, weeks } = useContext(CalendarContext);
	const [sortedEvents, setSortedEvents] = useState<SortedEvents>({
		due_dates: [],
		other: []
	});

	useEffect(() => {
		refreshEvents({ unhide: false });
	}, [weeks]);

	useEffect(() => {
		const sorted: SortedEvents = { due_dates: [], other: [] };
		const onTrackCalendar = calendars.find((calendar) => calendar.name.includes('OnTrack'));
		events.map((event: CalendarEvent) => {
			if(onTrackCalendar && event.calendarId === onTrackCalendar.id || event.categories.includes('Due dates')) {
				sorted.due_dates.push(event);
			}
			else {
				sorted.other.push(event);
			}
		});

		setSortedEvents(sorted);
	}, [events]);

	return (
		<CalendarContentWrapper data-testid="CalendarContent">

			<Block>
				<h2>Places to go, things to do</h2>
				<CalendarItemList>
					{sortedEvents.other.map((event, key) => {
						return <CalendarItem key={key} event={event} showTime={true} />;
					})}
				</CalendarItemList>
			</Block>

			<Block>
				<h2>Due dates</h2>
				<CalendarItemList>
					{sortedEvents.due_dates.map((event, key) => {
						return <CalendarItem key={key} event={event} showTime={false} />;
					})}
				</CalendarItemList>
			</Block>

		</CalendarContentWrapper>
	);
};

export default CalendarContent;
