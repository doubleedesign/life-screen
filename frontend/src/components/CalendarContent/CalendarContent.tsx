import React, { FC, useContext, useState, useEffect } from 'react';
import { CalendarContentWrapper } from './CalendarContent.styled';
import { CalendarContext } from '../../CalendarContext';
import axios from 'axios';
import { SERVER_URL } from '../../constants';
import { CalendarEvent } from '../../types';
import CalendarItem from './CalendarItem/CalendarItem';

interface CalendarContentProps {
	weeks: number
}

const CalendarContent: FC<CalendarContentProps> = ({ weeks }) => {
	const { selectedCalendars } = useContext(CalendarContext);
	const [events, setEvents] = useState<CalendarEvent[]>([]);

	function fetchEvents() {
		setEvents([]);

		selectedCalendars.forEach(async (calendar_id) => {
			const response = await axios.get(`${SERVER_URL}/events/${calendar_id}?weeks=${weeks}`);
			setEvents((prevState) => [...prevState, ...response.data].sort((a, b) => {
				return new Date(a.when.start.dateTime).getDate() - new Date(b.when.start.dateTime).getDate();
			}));
		});
	}

	useEffect(() => {
		fetchEvents();
	}, [selectedCalendars]);

	return (
		<CalendarContentWrapper data-testid="CalendarContent">
			{events.map((event, key) => {
				return <CalendarItem key={key} event={event} />;
			})}
		</CalendarContentWrapper>
	);
};

export default CalendarContent;
