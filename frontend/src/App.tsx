import GlobalHeader from './components/GlobalHeader/GlobalHeader.tsx';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme.ts';
import GlobalStyle from './components/global.style.ts';
import { selectUserId, useIsDarkMode } from './state/selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserAccount, setMessage, setUserProfile } from './state/actions.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import { useCallback } from 'react';
import MessageBar from './components/MessageBar/MessageBar.tsx';
import { fetchProfile } from './utils.ts';
import { FormattedResponse, User } from './types.ts';
import { CustomResponse, ResponseCode } from 'lifescreen-server/src/responses.ts';

function App() {
	const dispatch = useDispatch();
	const mode = useIsDarkMode() ? 'dark' : 'light';
	const currentTheme = theme[mode] ?? theme['dark'];
	const { value: msToken } = useLocalStorage('msgraph_token', '');
	const { value: gcalToken } = useLocalStorage('gcal_token', '');

	const handleProfile = useCallback((response: FormattedResponse, key: string) => {
		if (response.ok && response.content) {
			const profile = response.content as User;
			dispatch(setUserProfile({
				userId: profile.userId,
				idType: 'msgraph',
				displayName: profile.displayName,
				email: profile.email,
				timeZone: profile.timeZone
			}));
			dispatch(setMessage({
				key: key,
				code: response.code,
				message: `Fetched profile for msgraph account: ${profile.displayName}`
			}));
		}
		else {
			const errorType = Object.entries(ResponseCode).find(([, responseCode]) => responseCode === response.code);
			throw new CustomResponse[errorType?.[0] as keyof typeof ResponseCode ?? 'Error'](response.content as string ?? response.statusText);
		}
	}, [dispatch]);

	const handleError = useCallback((error: FormattedResponse, key: string) => {
		let prefix = '';
		if(key === 'msgraph_fetch_profile') {
			prefix = 'Microsoft account';
			dispatch(clearUserAccount('msgraph'));
		}
		if(key === 'gcal_fetch_profile') {
			prefix = 'Google account';
			dispatch(clearUserAccount('gcal'));
		}
		dispatch(setMessage({
			key: key,
			code: error.code,
			message: `${prefix} error: ${JSON.stringify(error.content)}`,
		}));
	}, [dispatch]);


	// Check local storage for accounts and set them in state if they aren't already there
	// because Redux doesn't persist between refreshes which includes service login redirects
	if(!useSelector(selectUserId('msgraph')) && localStorage.getItem('msgraph_id') !== null) {
		fetchProfile('msgraph', msToken, localStorage.getItem('msgraph_id') as string)
			.then(response => {
				handleProfile({
					...response,
					content: {
						// @ts-expect-error TS2698: Spread types may only be created from object types -- expecting an object here
						...response.content,
						userId: localStorage.getItem('msgraph_id') as string
					}
				}, 'msgraph_fetch_profile');
			})
			.catch(error => {
				handleError({
					ok: false,
					code: error.code,
					statusText: JSON.parse(JSON.stringify(error)).name,
					content: error.toString()
				}, 'msgraph_fetch_profile');
			});
	}
	if(!useSelector(selectUserId('gcal')) && localStorage.getItem('gcal_id') !== null) {
		fetchProfile('gcal', gcalToken, localStorage.getItem('gcal_id') as string)
			.then(response => {
				handleProfile({
					...response,
					content: {
						// @ts-expect-error TS2698: Spread types may only be created from object types -- expecting an object here
						...response.content,
						userId: localStorage.getItem('gcal_id') as string
					}
				}, 'gcal_fetch_profile');
			})
			.catch(error => {
				handleError({
					ok: false,
					code: error.code,
					statusText: JSON.parse(JSON.stringify(error)).name,
					content: error.toString()
				}, 'gcal_fetch_profile');
			});
	}


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
