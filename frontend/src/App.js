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
				setUserData(response.data);
			})
			.catch((error) => {
				//console.error(error);
			});
	}, []);

	useEffect(() => {
		if(userData.id) {
			setLoggedIn(true);
		}
		else {
			setLoggedIn(false);
		}
	}, [userData]);

	useEffect( () => {
		if (loggedIn && userData) {
			axios.get(`${SERVER_URL}/calendar`, { params: { user: userData } })
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [loggedIn, userData]);

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
