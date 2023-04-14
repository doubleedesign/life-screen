import React, { FC } from 'react';
import { CalendarItemTimeWrapper } from './CalendarItemTime.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/pro-solid-svg-icons';

interface CalendarItemTimeProps {
	start: Date;
	end?: Date;
	colors?: {
		primary: string,
		secondary: string
	}
}

const CalendarItemTime: FC<CalendarItemTimeProps> = ({ start, end, colors }) => {
	const hours: number = new Date(start).getHours();
	const minutes: number | string = new Date(start).getMinutes();
	const hoursText: string = hours < 10 ? `0${hours}` : hours.toString();
	const minutesText: string = minutes === 0 ? '00' : minutes.toString();

	const words = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
	let iconName: IconName = 'hourglass-clock';
	let difference;
	if(end) {
		// @ts-ignore
		iconName = hours > 11 ? `clock-${words[hours - 12]}` : `clock-${words[hours]}`;
		// @ts-ignore
		iconName = minutes === 30 ? `${iconName}-thirty` : iconName;
		// @ts-ignore
		difference = new Date(end) - new Date(start);
		difference = difference / 60 / 60 / 1000;
		difference = difference <= 1 ? `${difference} hour` : `${difference} hours`;
	}

	let timeOfDayIcon: IconName;
	if(!end) {
		timeOfDayIcon = 'calendar-clock';
	}
	else if(hours < 8 || hours >= 22) {
		timeOfDayIcon = 'house-night';
	}
	else if(hours >= 8 && hours < 14) {
		timeOfDayIcon = 'cloud-sun';
	}
	else if(hours >= 14 && hours < 18) {
		timeOfDayIcon = 'clouds-moon';
	}
	else if(hours >= 18 && hours < 22) {
		timeOfDayIcon = 'moon-stars';
	}
	else {
		timeOfDayIcon = 'calendar-clock';
	}


	return (
		<CalendarItemTimeWrapper data-testid="Date" colors={colors}>
			<span className="time-of-day-icon">
				<FontAwesomeIcon icon={['fad', timeOfDayIcon]} />
			</span>
			{end ?
				<>
					<FontAwesomeIcon icon={['fas', iconName]} />
					<span className="time">{hoursText}:{minutesText}</span>
					<span className="time time--description">{difference}</span>
				</>
				:
				<>
					<FontAwesomeIcon icon={['fas', iconName]} />
					<span className="time time--description">All day</span>
				</>
			}
		</CalendarItemTimeWrapper>
	);
};

export default CalendarItemTime;
