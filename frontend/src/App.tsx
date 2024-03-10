import GlobalHeader from './components/GlobalHeader/GlobalHeader.tsx';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme.ts';
import GlobalStyle from './components/global.style.ts';
import { selectUserId, useIsDarkMode } from './state/selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setUserId, setUserProfile } from './state/actions.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import { useCallback, useEffect } from 'react';
import { SERVER_URL } from './constants.tsx';
import { IdType } from './state/types.ts';
import MessageBar from './components/MessageBar/MessageBar.tsx';

function App() {
	const mode = useIsDarkMode() ? 'dark' : 'light';
	const currentTheme = theme[mode] ?? theme['dark'];
	// Check local storage for accounts and set them in state if they aren't already there
	// because Redux doesn't persist between refreshes which includes service login redirects
	const msId = useSelector((selectUserId('msgraph'))) ?? localStorage.getItem('msgraph_id');
	const gcalId = useSelector((selectUserId('gcal'))) ?? localStorage.getItem('gcal_id');


	const dispatch = useDispatch();
	const { value: msToken } = useLocalStorage('msgraph_token', '');
	const { value: gcalToken } = useLocalStorage('gcal_token', '');

	const fetchProfile = useCallback((accountType: IdType, token: string, userId: string) => {
		if (token !== '' && userId) {
			fetch(`${SERVER_URL}/${accountType}/me`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
			})
				.then(response => {
					dispatch(setMessage({
						key: `${accountType}_fetch_profile`,
						code: response.status,
						message: `Fetch profile for ${accountType} account: ${response.statusText}`
					}));
					return response.text();
				})
				.then(result => {
					const profileData = JSON.parse(result);
					dispatch(setUserProfile({
						userId: profileData.id,
						idType: accountType,
						displayName: profileData.displayName,
						email: profileData.email,
						timeZone: profileData.timeZone
					}));
				})
				.catch(error => console.log('error', error));
		}
	}, [dispatch]);

	useEffect(() => {
		if (msId && msToken) {
			dispatch(setUserId({
				id: msId,
				idType: 'msgraph'
			}));
			fetchProfile('msgraph', msToken, msId);
		}

		if (gcalId && gcalToken) {
			dispatch(setUserId({
				id: gcalId,
				idType: 'gcal'
			}));
			fetchProfile('gcal', gcalToken, gcalId);
		}
		// Only run on load; if deps are set then the server his hit with repeated requests
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<ThemeProvider theme={currentTheme}>
			<GlobalStyle />
			<GlobalHeader/>
			<MessageBar/>
			<Outlet/>
		</ThemeProvider>
	);
}

export default App;
