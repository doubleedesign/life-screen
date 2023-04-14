import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { Calendar, CalendarEvent } from './types';
import axios from 'axios';
import { SERVER_URL } from './constants';

interface CalendarContextProps {
	calendars: Calendar[];
}

export interface MyAppContext {
	calendars: Calendar[];
	selectedCalendars: string[];
	events: CalendarEvent[];
	weeks: number;
	setSelectedCalendars: Dispatch<SetStateAction<string[]>>;
	setHiddenSeries: Dispatch<SetStateAction<string[]>>;
	refreshEvents: (options: { unhide: boolean }) => void;
	setWeeks: Dispatch<SetStateAction<number>>;
}

// Function to fetch, filter, and sort event data
const fetchEvents = async (selectedCalendars: string[], hiddenSeries: string[], weeks: number): Promise<CalendarEvent[]> => {
	// Use axios.all to return an array of all the query responses, one per calendar
	const result = await axios.all(selectedCalendars.map((calendar_id) => {
		return axios.get(`${SERVER_URL}/events/${calendar_id}?weeks=${weeks}`);
	})).then((response) => {
		return response;
	});

	// Flatten them down into one array of all events
	const collection = result.flatMap((eventSet) => {
		return eventSet.data;
	});

	// Return flattened array of events, sorted by date, with any hidden series filtered out
	return collection
		.filter((event) => !hiddenSeries.includes(event.seriesMasterId))
		.sort((a, b) => {
			return (a.when.start.dateTime).localeCompare(b.when.start.dateTime);
		});
};

export const CalendarContext = createContext({} as MyAppContext);

const CalendarContextProvider: React.FC<PropsWithChildren<CalendarContextProps>> = function({ calendars, children }) {
	const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);
	const [weeks, setWeeks] = useState<number>(1);

	const refreshEvents = (options: {unhide: boolean}) => {
		if(options.unhide) {
			setHiddenSeries([]);
		}

		fetchEvents(selectedCalendars, hiddenSeries, weeks).then((response: CalendarEvent[]) => setEvents(response));
	};

	// Set calendars on initial load
	useEffect(() => {
		// Add custom fields to calendar data that comes in from MS Graph
		calendars.map(calendar => {
			switch(calendar.name) {
			case 'Calendar':
				calendar.displayName = 'General';
				calendar.sortPosition = 1;
				calendar.colors = {
					primary: '#4e317e',
					secondary: '#845ec2'
				};
				break;
			case 'Deakin':
				calendar.displayName = 'Uni';
				calendar.logo = 'deakin.svg';
				calendar.sortPosition = 2;
				calendar.colors = {
					primary: '#ffd923',
					secondary: '#c74298',
				};
				break;
			case 'Deakin - OnTrack':
				calendar.displayName = 'Uni - OnTrack';
				calendar.logo = 'deakin.svg';
				calendar.sortPosition = 3;
				calendar.colors = {
					primary: '#ffd923',
					secondary: '#0b7161',
				};
				break;
			case 'RMIT':
				calendar.displayName = 'Teaching';
				calendar.logo = 'rmit.svg';
				calendar.sortPosition = 5;
				calendar.colors = {
					primary: '#e60028',
					secondary: '#070758'
				};
				break;
			case 'NAB':
				calendar.displayName = 'Work';
				calendar.logo = 'nab.svg';
				calendar.sortPosition = 4;
				calendar.colors = {
					primary: '#be0d00',
					secondary: '#000'
				};
				break;
			default:
				calendar.sortPosition = 10;
				calendar.colors = {
					primary: '',
					secondary: '#E6E6FA'
				};
			}
		});

		// Sort them into my desired order
		calendars.sort((a: Calendar, b: Calendar): number => {
			if(a.sortPosition > b.sortPosition) {
				return 1;
			}
			return 0;
		});

		// Initially load all calendars except work one as selected
		setSelectedCalendars(calendars.filter((calendar) => calendar.name !== 'NAB').map(calendar => calendar.id));
	}, [calendars]);


	// Fetch events when calendars change
	useEffect(() => {
		fetchEvents(selectedCalendars, hiddenSeries, weeks).then((response: CalendarEvent[]) => setEvents(response));
	}, [selectedCalendars]);


	// Re-filter events when a series is hidden
	useEffect(() => {
		setEvents(events.filter((event) => !hiddenSeries.includes(event.seriesMasterId)));
	}, [hiddenSeries]);

	return (
		<CalendarContext.Provider value={{ calendars, selectedCalendars, events, weeks, setSelectedCalendars, setHiddenSeries, refreshEvents, setWeeks }}>
			{children}
		</CalendarContext.Provider>
	);
};

export default CalendarContextProvider;
