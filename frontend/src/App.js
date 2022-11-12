import { useState, useEffect } from 'react';
import axios from 'axios';
import './_App.scss';

function App() {
	const [userData, setUserData] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const SERVER_URL = 'http://localhost:4000';
	const LOGIN_URL = `${SERVER_URL}/auth/login`;
	const LOGOUT_URL = `${SERVER_URL}/auth/logout`;

	useEffect(() => {
		axios.get(`${SERVER_URL}/me`)
			.then((response) => {
				console.log(response.data);
				setUserData(response.data);
			})
			.catch((error) => {
				//console.error(error);
			});
	}, []);

	useEffect(() => {
		console.log(userData);
		if(userData.id) {
			setLoggedIn(true);
		}
		else {
			setLoggedIn(false);
		}
	}, [userData]);

	/*
	const test = axios.get('http://localhost:4000/calendar')
		.then((response) => {
			//console.log(response);
			return response;
		})
		.catch((error) => {
		//console.error(error);
		}); */

	//console.log(test);

	return (
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
		</div>
	);
}

export default App;
