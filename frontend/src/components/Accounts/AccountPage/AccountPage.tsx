import { FC, useCallback, useEffect } from 'react';
import { IdType } from '../../../state/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../../hooks/useLocalStorage.ts';
import { logout, parseHash } from '../../../utils.ts';
import { clearUserAccount, setMessage, setUserId } from '../../../state/actions.ts';
import { SERVER_URL } from '../../../constants.tsx';
import { Container, Row } from '../../common.styled.ts';
import Button from '../../Button/Button.tsx';
import { MicrosoftLogo } from '../assets/MicrosoftLogo.tsx';
import { selectUserProfile } from '../../../state/selectors.ts';
import EmailIcon from '@atlaskit/icon/glyph/email';
import RecentIcon from '@atlaskit/icon/glyph/recent';

type AccountPageProps = {
	accountType: IdType;
	title: string;
	userId?: string;
}

const AccountPage: FC<AccountPageProps> = ({ accountType, userId, title }) => {
	const dispatch = useDispatch();
	const token = useLocalStorage(`${accountType}_token`, '');
	const profile = useSelector(selectUserProfile(accountType));

	// Just logged in and returned with URL fragment
	useEffect(() => {
		const hashData: { [key: string]: string } = parseHash(window.location.hash);
		if (hashData?.token && hashData?.userId) {
			dispatch(setUserId({
				id: hashData.userId,
				idType: accountType
			}));
			token.setValue(hashData.token);
		}
		// Only run on load; if deps are set an infinite loop is caused
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLogout = useCallback(async () => {
		const response = await logout(accountType, token.value);
		dispatch(clearUserAccount(accountType));
		if (response.ok) {
			dispatch(setMessage({
				key: `${accountType}_logout`,
				code: response.code,
				message: response.content,
			}));
		}
		else {
			dispatch(setMessage({
				key: `${accountType}_logout`,
				code: response.code,
				message: `${response.content.message}. Local credentials have been cleared, but the server may still have an active session.`,
			}));
		}
	}, [accountType, dispatch, token]);

	return (
		<Container data-testid="Account">
			<Row>
				<div>
					<MicrosoftLogo />
				</div>
				<div>
					<h1>{title} Account</h1>
					{profile.displayName && <h2>{profile.displayName}</h2>}
				</div>
				{userId && token ? (
					<Button onClick={handleLogout} appearance="primary" label="Log out"/>
				): (
					<Button href={`${SERVER_URL}/${accountType}/auth/login`} appearance="primary" label="Log in"/>
				)}
			</Row>

			{profile.email && <><EmailIcon label="Email"/><span>{profile.email}</span></> }
			{profile.timeZone && <><RecentIcon label="Timezone"/><span>{profile.timeZone}</span></>}

		</Container>
	);
};

export default AccountPage;

