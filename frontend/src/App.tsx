import React, { useState, useEffect } from 'react';
import { CalendarContextProvider } from './CalendarContext';
import axios from 'axios';
import { User, Calendar } from '../types';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import CalendarMenu from './components/CalendarMenu/CalendarMenu';
import { faRotateRight } from '@fortawesome/pro-solid-svg-icons';
import { LOGIN_URL, SERVER_URL } from './constants';
import GlobalHeader from './components/GlobalHeader/GlobalHeader';
import GlobalStyle from './GlobalStyle';
import DialogBox from './components/DialogBox/DialogBox';
import { StyledButtonLink } from './components/ButtonLink/ButtonLink.styled';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledButton } from './components/Button/Button.styled';
library.add(fas, faRotateRight);

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
			{loggedIn ? <CalendarContextProvider calendars={calendars}>
				<GlobalHeader userData={userData} />
				{loggedIn &&
				<>
					<StyledButton onClick={fetchCalendars}>Re-fetch calendars <FontAwesomeIcon icon={['fas', 'rotate-right']}/></StyledButton>
					<CalendarMenu />
				</>
				}
			</CalendarContextProvider>
				:
				<DialogBox size="md" title="Access">
					<StyledButtonLink href={LOGIN_URL}>Log in</StyledButtonLink>
				</DialogBox>
			}
		</ThemeProvider>
	);
}

export default App;
