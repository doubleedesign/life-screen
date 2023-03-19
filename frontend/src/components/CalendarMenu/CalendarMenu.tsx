import React, { useState, useEffect } from 'react';
import { Calendar } from '../../../types';

export interface CalendarMenuProps {
	calendars: Calendar[]
}
export const CalendarMenu: React.FC<CalendarMenuProps> = function({ calendars }) {
	const [selected, setSelected] = useState<Calendar[]>(calendars);

	return (
		<ul>
			{calendars.map((calendar) => (
				<li key={calendar.id}>
					<input type="checkbox" name={calendar.name}/>
					<label key={calendar.id} htmlFor={calendar.name}>{calendar.name}</label>
				</li>
			))}
		</ul>
	);
};

export default CalendarMenu;
