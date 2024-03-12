import GlobalHeader from './components/GlobalHeader/GlobalHeader.tsx';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme.ts';
import GlobalStyle from './components/global.style.ts';
import { useIsDarkMode } from './state/selectors.ts';
import { useDispatch } from 'react-redux';
import { setMessage, setUserProfile } from './state/actions.ts';
import { useCallback, useEffect } from 'react';
import MessageBar from './components/MessageBar/MessageBar.tsx';
import { fetchProfile } from './utils.ts';
import { FormattedResponse, Message, User } from './types.ts';
import { CustomResponse, ResponseCode } from 'lifescreen-server/src/responses.ts';
import { IdType } from './state/types.ts';

function App() {
	const dispatch = useDispatch();
	const mode = useIsDarkMode() ? 'dark' : 'light';
	const currentTheme = theme[mode] ?? theme['dark'];
	// const { value: msId } = useLocalStorage('msgraph_id', '');
	// const { value: msToken } = useLocalStorage('msgraph_token', '');
	// const { value: gcalId } = useLocalStorage('gcal_id', '');
	// const { value: gcalToken } = useLocalStorage('gcal_token', '');
	const msId = localStorage.getItem('msgraph_id');
	const msToken = localStorage.getItem('msgraph_token');
	const gcalId = localStorage.getItem('gcal_id');
	const gcalToken = localStorage.getItem('gcal_token');

	const handleProfile = useCallback((response: FormattedResponse, key: string, idType: IdType) => {
		if (response.ok && response.content) {
			const profile = response.content as User;
			dispatch(setUserProfile({
				userId: profile.userId,
				idType: idType,
				displayName: profile.displayName,
				email: profile.email,
				timeZone: profile.timeZone
			}));
			dispatch(setMessage({
				key: key,
				code: response.code,
				message: `Fetched profile for ${idType} account: ${profile.displayName}`
			}));
		}
		else {
			const errorType = Object.entries(ResponseCode).find(([, responseCode]) => responseCode === response.code);
			throw new CustomResponse[errorType?.[0] as keyof typeof ResponseCode ?? 'Error']((response.content as Pick<Message, 'message'>)?.message ?? response.statusText);
		}
	}, [dispatch]);

	const handleError = useCallback((error: FormattedResponse, key: string) => {
		let prefix = '';
		if(key === 'msgraph_fetch_profile') {
			prefix = 'Microsoft account';
		}
		if(key === 'gcal_fetch_profile') {
			prefix = 'Google account';
		}
		dispatch(setMessage({
			key: key,
			code: error.code,
			message: `${prefix} error: ${(error.content as Pick<Message, 'message'>)?.message})}`,
		}));
	}, [dispatch]);


	// Check local storage for accounts and set them in state if they aren't already there
	// because Redux doesn't persist between refreshes which includes service login redirects
	useEffect(() => {
		if(msId && msId !== '' && msToken && msToken !== '') {
			fetchProfile('msgraph', msToken, msId)
				.then((profile) => {
					handleProfile({
						...profile,
						content: {
							...profile.content,
							userId: msId
						}
					}, 'msgraph_fetch_profile', 'msgraph');
				})
				.catch((error: FormattedResponse) => {
					handleError({
						ok: false,
						code: error.code,
						statusText: JSON.parse(JSON.stringify(error)).name,
						content: {
							message: error?.toString()
						}
					}, 'msgraph_fetch_profile');
				});
		}
	}, [msId, msToken, handleProfile, handleError]);

	useEffect(() => {
		if (gcalId && gcalId !== '' && gcalToken && gcalToken !== '') {
			fetchProfile('gcal', gcalToken, gcalId)
				.then((profile) => {
					handleProfile({
						...profile,
						content: {
							...profile.content,
							userId: gcalId
						}
					}, 'gcal_fetch_profile', 'gcal');
				})
				.catch((error: FormattedResponse) => {
					handleError({
						ok: false,
						code: error.code,
						statusText: JSON.parse(JSON.stringify(error)).name,
						content: {
							message: error?.toString()
						}
					}, 'gcal_fetch_profile');
				});
		}
	}, [gcalId, gcalToken, handleError, handleProfile]);

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
