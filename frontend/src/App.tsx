import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LOGIN_URL, SERVER_URL } from './constants';
import { User, Calendar } from './types';
import GlobalStyle from './GlobalStyle';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import CalendarContextProvider from './CalendarContext';
import GlobalHeader from './components/GlobalHeader/GlobalHeader';
import GlobalSubheader from './components/GlobalSubheader/GlobalSubheader';
import Summary from './components/Summary/Summary';
import CalendarContent from './components/CalendarContent/CalendarContent';
import DialogBox from './components/DialogBox/DialogBox';
import { StyledButtonLink } from './components/ButtonLink/ButtonLink.styled';
import 'react-tooltip/dist/react-tooltip.css';

function App() {
	const [userData, setUserData] = useState<User | null>(null);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [calendars, setCalendars] = useState<Calendar[]>([]);

	function fetchProfile() {
		return axios.get(`${SERVER_URL}/me`)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function fetchCalendars() {
		axios.get(`${SERVER_URL}/calendars`)
			.then((response) => {
				const calendars: Calendar[] = response.data.value;
				// Filter out unwanted calendars before saving to state
				const keep = calendars.filter(calendar => calendar.name !== 'Birthdays');
				setCalendars(keep);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	useEffect(() => {
		fetchProfile().then((data) => {
			setUserData(data);
		});
	}, []);

	useEffect(() => {
		setLoggedIn(!!userData?.id);
	}, [userData]);

	useEffect(() => {
		if(loggedIn) {
			fetchCalendars();
		}
	}, [loggedIn]);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{loggedIn ?
				<CalendarContextProvider calendars={calendars} user={userData}>
					<GlobalHeader />
					<GlobalSubheader/>
					<Summary />
					<CalendarContent />
				</CalendarContextProvider>
				:
				<DialogBox size="md" title="Access">
					<StyledButtonLink color="tertiary" href={LOGIN_URL}>Log in</StyledButtonLink>
				</DialogBox>
			}
		</ThemeProvider>
	);
}

export default App;
