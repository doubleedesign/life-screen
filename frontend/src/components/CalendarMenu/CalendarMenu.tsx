import React, { useContext } from 'react';
import { CalendarContext } from '../../CalendarContext';
import { CalendarMenuList, CalendarMenuListItem } from './CalendarMenu.styled';
import Checkbox from '../Checkbox/Checkbox';

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
		<CalendarMenuList>
			{calendars.map((calendar) => (
				<CalendarMenuListItem key={calendar.id}>
					<Checkbox label={calendar.displayName || calendar.name}
						image={calendar.logo}
						color={calendar?.colors?.secondary || calendar.hexColor}
						checked={selectedCalendars.includes(calendar.id)}
						onChange={() => handleChange(calendar.id)} />
				</CalendarMenuListItem>
			))}
		</CalendarMenuList>
	);
};

export default CalendarMenu;
