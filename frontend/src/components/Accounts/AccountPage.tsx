import { FC, useEffect, useState } from 'react';
import { IdType } from '../../state/types.ts';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { parseHash } from '../../utils.ts';
import { setUserId, setUserProfile } from '../../state/actions.ts';
import { SERVER_URL } from '../../constants.tsx';
import Message from '../Message/Message.tsx';
import Button from '../Button/Button.tsx';
import { Container } from '../common.styled.ts';

type AccountPageProps = {
	accountType: IdType;
	title: string;
	userId?: string;
}

const AccountPage: FC<AccountPageProps> = ({ accountType, userId, title }) => {
	const dispatch = useDispatch();
	const [status, setStatus] = useState({
		code: 418,
		message: 'I\'m a teapot',
	});
	const [message, setMessage] = useState('');
	const token = useLocalStorage(`ls_${accountType}`, '');

	useEffect(() => {
		// Just logged in and returned with URL fragment
		const hashData: { [key: string]: string } = parseHash(window.location.hash);
		if (hashData?.token && hashData?.userId) {
			dispatch(setUserId({
				id: hashData.userId,
				idType: accountType
			}));
			token.setValue(hashData.token);
		}

		// If userId and token are set, attempt to fetch profile
		if (token.value !== '' && userId) {
			fetch(`${SERVER_URL}/${accountType}/me`, {
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
						idType: accountType,
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
		<Container data-testid="Account">
			{(status.code === 200 && userId) ? (
				<Message type="success">
					<p>{message}</p>
					<Button appearance="primary" label={`Log out of ${title} account`} href={`${SERVER_URL}/${accountType}/auth/logout`}></Button>
				</Message>
			) : (
				<Message type="error">
					<p>{status.code}: {status.message}</p>
					<Button appearance="primary" label={`Log in to ${title} account`} href={`${SERVER_URL}/${accountType}/auth/login`}></Button>
				</Message>
			)}
		</Container>
	);
};

export default AccountPage;

