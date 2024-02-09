import { FC, useState, useEffect } from 'react';
import { MicrosoftAccountWrapper } from './MicrosoftAccount.styled.ts';
import { SERVER_URL } from '../../../constants.tsx';
import { useLocalStorage } from '../../../hooks/useLocalStorage.ts';
import { parseHash } from '../../../utils.ts';
import { useDispatch } from 'react-redux';
import { SET_MS_CREDENTIALS } from '../../../state/actions.ts';

interface MicrosoftAccountProps {
}


const MicrosoftAccount: FC<MicrosoftAccountProps> = () => {
	const dispatch = useDispatch();
	const [status, setStatus] = useState({
		code: 418,
		message: 'I\'m a teapot',
	});
	const [message, setMessage] = useState('');

	useEffect(() => {
		// Just logged in and returned with URL fragment
		const hashData: {[key: string]: string} = parseHash(window.location.hash);
		if(hashData?.token && hashData?.userId) {
			dispatch({ type: SET_MS_CREDENTIALS, payload: hashData });
		}

		// If userId and token are set, attempt to fetch profile
		if (value.token !== '' && value.userId !== '') {
			fetch(`${SERVER_URL}/msgraph/me`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Authorization': `Bearer ${value}`,
					'Content-Type': 'application/json'
				},
			})
				.then(response => {
					setStatus({
						code: response.status,
						message: response.statusText,
					});
					return response.text();
				})
				.then(result => {
					setMessage(result);
				})
				.catch(error => console.log('error', error));
		}
	// Only run on load; if deps are set then the server his hit with repeated requests
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<MicrosoftAccountWrapper data-testid="MicrosoftAccount">
			<div>{status.code}: {status.message} {message}</div>
			<a href="http://localhost:3001/msgraph/auth/login">Log in to Microsoft account</a>
		</MicrosoftAccountWrapper>
	);
};

export default MicrosoftAccount;
