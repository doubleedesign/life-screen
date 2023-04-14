import React, { FC, useContext, useState, useEffect } from 'react';
import { SummaryWrapper } from './Summary.styled';
import { Block, FlexRow } from '../common';
import DialogBox from '../DialogBox/DialogBox';
import { CalendarContext } from '../../CalendarContext';
import { CalendarEvent } from '../../types';

const Summary: FC = () => {
	const { user, calendars, events } = useContext(CalendarContext);
	const [upcoming, setUpcoming] = useState<CalendarEvent[]>([]);
	const [grouped, setGrouped] = useState<any>({ due_dates: [], go_places: [], marking: [], business: [] });
	const [status, setStatus] = useState<string>('');
	const [rating, setRating] = useState<number>(2);
	const ratingColours = ['#d54667', '#ff6831', '#0050a2', '#00b26e'];

	function getNextSaturday() {
		const date = new Date();
		const daysToSaturday = 6 - date.getDay();

		return new Date(date.setDate(date.getDate() + daysToSaturday)).toDateString();
	}

	function getNextSunday() {
		const date = new Date();
		const daysToSunday = 0 - date.getDay() + 7;

		return new Date(date.setDate(date.getDate() + daysToSunday)).toDateString();
	}

	useEffect(() => {
		setUpcoming(events.filter((event) => {
			const thisDate = new Date(event.when.start.dateTime);
			return thisDate.toDateString() === getNextSaturday() || thisDate.toDateString() === getNextSunday();
		}));
	}, [events]);

	useEffect(() => {
		const onTrackCalendar = calendars.find((calendar) => calendar.name.includes('OnTrack'));
		const collection: { go_places: CalendarEvent[]; due_dates: CalendarEvent[], marking: CalendarEvent[], business: CalendarEvent[] } = {
			due_dates: [],
			go_places: [],
			marking: [],
			business: []
		};

		upcoming.map((event) => {
			if(onTrackCalendar && event.calendarId === onTrackCalendar.id || event.categories.includes('Due dates')) {
				collection.due_dates.push(event);
			}
			if(event.where.displayName) {
				collection.go_places.push(event);
			}
		});

		setGrouped(collection);
	}, [upcoming]);

	useEffect(() => {
		if(upcoming.length < 2) {
			setStatus('really good');
			setRating(3);
		}
		else if(upcoming.length > 4) {
			setStatus('extremely busy');
			setRating(0);
		}
		else {
			if(grouped.go_places.length > 2) {
				setStatus('busy');
				setRating(1);
			}
			else {
				setStatus('okay');
				setRating(2);
			}
		}
	}, [upcoming, grouped]);


	return (
		<SummaryWrapper data-testid="Summary" color={ratingColours[rating]}>
			<FlexRow>
				<Block>
					<DialogBox size="default" title="Weather">
						<p>Still to come</p>
					</DialogBox>
				</Block>
				<Block>
					<DialogBox size="default" title="Focus time" color="primary">
						<p>Still to come</p>
					</DialogBox>
				</Block>
				<Block>
					<DialogBox size="default" title="This weekend" color={ratingColours[rating]}>
						<div>
							<p>This weekend is looking <strong>{status}</strong>.</p>
							<p>You have <strong>{grouped.go_places.length}</strong> places to go and <strong>{grouped.due_dates.length}</strong> pieces of uni work due.</p>
							<p>You still need to add notifications about marking and business work here.</p>
						</div>
					</DialogBox>
				</Block>
			</FlexRow>
		</SummaryWrapper>
	);
};

export default Summary;
