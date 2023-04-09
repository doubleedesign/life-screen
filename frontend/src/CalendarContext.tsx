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

export const CalendarContextProvider: React.FC<PropsWithChildren<CalendarContextProps>> = function({ calendars, children }) {
	const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);

	useEffect(() => {
		// Add custom fields to calendar data that comes in from MS Graph
		calendars.map(calendar => {
			switch(calendar.name) {
			case 'Calendar':
				calendar.displayName = 'General';
				calendar.sortPosition = 1;
				calendar.colors = {
					background: '#845ec2'
				};
				break;
			case 'Deakin':
				calendar.displayName = 'Uni';
				calendar.logo = 'deakin.svg';
				calendar.sortPosition = 2;
				calendar.colors = {
					background: '#0B7161'
				};
				break;
			case 'RMIT':
				calendar.displayName = 'Teaching';
				calendar.logo = 'rmit.svg';
				calendar.sortPosition = 4;
				calendar.colors = {
					background: '#070758'
				};
				break;
			case 'NAB':
				calendar.displayName = 'Work';
				calendar.logo = 'nab.svg';
				calendar.sortPosition = 3;
				calendar.colors = {
					background: '#000'
				};
				break;
			default:
				calendar.sortPosition = 10;
				calendar.colors = {
					background: '#E6E6FA'
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

		// Initially load all calendars as selected
		setSelectedCalendars(calendars.map(calendar => calendar.id));
	}, [calendars]);

	return (
		<CalendarContext.Provider value={{ calendars, selectedCalendars, setSelectedCalendars }}>
			{children}
		</CalendarContext.Provider>
	);
};
