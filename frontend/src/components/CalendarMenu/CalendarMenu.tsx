import React, { useContext } from 'react';
import { CalendarContext } from '../../CalendarContext';

export const CalendarMenu: React.FC=  function() {
	const { calendars, selectedCalendars, setSelectedCalendars } = useContext(CalendarContext);

	const handleChange = (id: string) => {
		if(selectedCalendars.includes(id)) {
			setSelectedCalendars(selectedCalendars.filter(calendar_id => calendar_id !== id));
		}
		else {
			setSelectedCalendars([...selectedCalendars, id]);
		}
	};

	return (
		<ul>
			{calendars.map((calendar) => (
				<li key={calendar.id}>
					<input type="checkbox" name={calendar.name} checked={selectedCalendars.includes(calendar.id)} onChange={() => handleChange(calendar.id)} />
					<label key={calendar.id} htmlFor={calendar.name}>{calendar.name}</label>
				</li>
			))}
		</ul>
	);
};

export default CalendarMenu;
