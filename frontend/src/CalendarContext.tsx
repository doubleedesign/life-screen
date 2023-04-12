import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { Calendar } from './types';

interface CalendarContextProps {
	calendars: Calendar[]
}

export interface MyAppContext {
	calendars: Calendar[],
	selectedCalendars: string[],
	setSelectedCalendars: Dispatch<SetStateAction<string[]>>
}

export const CalendarContext = createContext({} as MyAppContext);

const CalendarContextProvider: React.FC<PropsWithChildren<CalendarContextProps>> = function({ calendars, children }) {
	const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);

	useEffect(() => {
		// Add custom fields to calendar data that comes in from MS Graph
		calendars.map(calendar => {
			switch(calendar.name) {
			case 'Calendar':
				calendar.displayName = 'General';
				calendar.sortPosition = 1;
				calendar.colors = {
					primary: '#845ec2',
					secondary: '#845ec2'
				};
				break;
			case 'Deakin':
				calendar.displayName = 'Uni';
				calendar.logo = 'deakin.svg';
				calendar.sortPosition = 2;
				calendar.colors = {
					primary: '#0B7161',
					secondary: '#c74298',
				};
				break;
			case 'RMIT':
				calendar.displayName = 'Teaching';
				calendar.logo = 'rmit.svg';
				calendar.sortPosition = 4;
				calendar.colors = {
					primary: '#e60028',
					secondary: '#070758'
				};
				break;
			case 'NAB':
				calendar.displayName = 'Work';
				calendar.logo = 'nab.svg';
				calendar.sortPosition = 3;
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

		// Initially load all calendars except work as selected
		setSelectedCalendars(calendars.filter((calendar) => calendar.name !== 'NAB').map(calendar => calendar.id));
	}, [calendars]);

	return (
		<CalendarContext.Provider value={{ calendars, selectedCalendars, setSelectedCalendars }}>
			{children}
		</CalendarContext.Provider>
	);
};

export default CalendarContextProvider;
