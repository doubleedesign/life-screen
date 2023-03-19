import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Calendar } from '../types';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import CalendarMenu from './components/CalendarMenu/CalendarMenu';
import Button from './components/Button/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { faRotateRight } from '@fortawesome/pro-solid-svg-icons';
library.add(fas, faRotateRight);

function App() {
	const [userData, setUserData] = useState<User>();
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [calendars, setCalendars] = useState<Calendar[]>([]);
	const SERVER_URL = 'http://localhost:4000';
	const LOGIN_URL = `${SERVER_URL}/auth/login`;
	const LOGOUT_URL = `${SERVER_URL}/auth/logout`;

	function fetchProfile() {
		return axios.get(`${SERVER_URL}/me`)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				//console.error(error);
			});
	}

	function fetchCalendars() {
		axios.get(`${SERVER_URL}/calendars`)
			.then((response) => {
				const calendars: Calendar[] = response.data.value;

				// Filter out unwanted calendars
				const keep = calendars.filter(calendar => calendar.name !== 'Birthdays');

				// Save to component state
				setCalendars(keep);
			})
			.catch((error) => {
				console.warn('Error in fetchCalendars on front end');
				// console.error(error);
			});
	}

	useEffect(() => {
		fetchProfile().then((data) => {
			setUserData(data);
		});
	}, []);

	useEffect(() => {
		// @ts-ignore
		setLoggedIn(userData?.id ? true : false);
	}, [userData]);


	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<header className="app__header">
					<div className="container">
						<div className="app__header__name">
							<h1>LifeScreen</h1>
						</div>
						<div className="app__header__user">
							<span>{userData?.displayName}</span>
							<span>{userData?.mail}</span>
							{loggedIn ? <a href={LOGOUT_URL}>Log out</a> : <a href={LOGIN_URL}>Log in</a>}
						</div>
					</div>
				</header>
				<main>
					{loggedIn &&
						<>
							<div className="container">
								<Button onClick={fetchCalendars} label="Re-fetch calendars" icon={['fas', 'rotate-right']}/>
								<Button onClick={fetchProfile} label="Re-fetch profile" icon={['fas', 'rotate-right']}/>
							</div>
							<div className="container">
								<CalendarMenu calendars={calendars}/>
							</div>
						</>
					}
				</main>
			</div>
		</ThemeProvider>
	);
}

export default App;