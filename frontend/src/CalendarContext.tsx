import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { Calendar } from '../types';

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
	const SERVER_URL = 'http://localhost:4000';

	useEffect(() => {
		setSelectedCalendars(calendars.map(calendar => calendar.id));
	}, [calendars]);

	return (
		<CalendarContext.Provider value={{ calendars, selectedCalendars, setSelectedCalendars }}>
			{children}
		</CalendarContext.Provider>
	);
};
