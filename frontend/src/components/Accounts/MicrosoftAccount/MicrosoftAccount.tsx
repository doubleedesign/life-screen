import { FC, useState, useEffect } from 'react';
import { SERVER_URL } from '../../../constants.tsx';
import { useLocalStorage } from '../../../hooks/useLocalStorage.ts';
import { parseHash } from '../../../utils.ts';
import { useDispatch } from 'react-redux';
import { setUserId, setUserProfile } from '../../../state/actions.ts';
import Message from '../../Message/Message.tsx';
import Button from '../../Button/Button.tsx';
import { Container } from '../../common.styled.ts';

interface MicrosoftAccountProps {
	userId?: string;
}


export const MicrosoftAccountComponent: FC<MicrosoftAccountProps> = ({ userId }) => {
	const dispatch = useDispatch();
	const [status, setStatus] = useState({
		code: 418,
		message: 'I\'m a teapot',
	});
	const [message, setMessage] = useState('');
	const token = useLocalStorage('ls_msgraph', '');

	useEffect(() => {
		// Just logged in and returned with URL fragment
		const hashData: { [key: string]: string } = parseHash(window.location.hash);
		if (hashData?.token && hashData?.userId) {
			dispatch(setUserId({
				id: hashData.userId,
				idType: 'msgraph'
			}));
			token.setValue(hashData.token);
		}

		// If userId and token are set, attempt to fetch profile
		if (token.value !== '' && userId) {
			fetch(`${SERVER_URL}/msgraph/me`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Authorization': `Bearer ${token.value}`,
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
					const profileData = JSON.parse(result);
					dispatch(setUserProfile({
						userId: profileData.id,
						idType: 'msgraph',
						displayName: profileData.displayName,
						email: profileData.mail,
						timeZone: profileData.timeZone
					}));
					setMessage(`Welcome, ${profileData.displayName}`);
				})
				.catch(error => console.log('error', error));
		}
		// Only run on load; if deps are set then the server his hit with repeated requests
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container data-testid="MicrosoftAccount">
			{(status.code === 200 && userId) ? (
				<Message type="success">
					<p>{message}</p>
					<Button appearance="primary" label="Log out of Microsoft account" href={`${SERVER_URL}/msgraph/auth/logout`}></Button>
				</Message>
			) : (
				<Message type="error">
					<p>{status.code}: {status.message}</p>
					<Button appearance="primary" label="Log in to Microsoft account" href={`${SERVER_URL}/msgraph/auth/login`}></Button>
				</Message>
			)}
		</Container>
	);
};


