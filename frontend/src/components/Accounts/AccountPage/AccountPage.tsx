import { FC, useCallback, useEffect } from 'react';
import { IdType } from '../../../state/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../../hooks/useLocalStorage.ts';
import { logout, parseHash } from '../../../utils.ts';
import { clearUserAccount, setMessage, setUserId } from '../../../state/actions.ts';
import { SERVER_URL } from '../../../constants.tsx';
import { Container } from '../../common.styled.ts';
import Button from '../../Button/Button.tsx';
import { MicrosoftLogo } from '../assets/MicrosoftLogo.tsx';
import { selectUserProfile } from '../../../state/selectors.ts';
import EmailIcon from '@atlaskit/icon/glyph/email';
import RecentIcon from '@atlaskit/icon/glyph/recent';
import { AccountBox, AccountLogo, AccountRow } from './AccountPage.style.ts';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogo } from '../assets/GoogleLogo.tsx';

type AccountPageProps = {
	accountType: IdType;
	title: string;
	userId?: string;
}

const AccountPage: FC<AccountPageProps> = ({ accountType, userId, title }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const id = useLocalStorage(`${accountType}_id`, userId ?? '');
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
			id.setValue(hashData.userId);

			setTimeout(() => {
				navigate(location.pathname + location.search, { replace: true });
			}, 300);
		}
		// Only run on load; if deps are set an infinite loop is caused
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Click handler for logout button
	const handleLogout = useCallback(async () => {
		const response = await logout(accountType, token.value);
		token.setValue('');
		id.setValue('');
		dispatch(clearUserAccount(accountType));
		if (response.ok) {
			dispatch(setMessage({
				key: `${accountType}_logout`,
				code: response.code,
				message: response.content.message,
			}));
		}
		else {
			dispatch(setMessage({
				key: `${accountType}_logout`,
				code: response.code,
				message: `${response.content.message}. Local credentials have been cleared, but the server may still have an active session.`,
			}));
		}
	}, [accountType, dispatch, id, token]);

	return (
		<Container data-testid="Account">
			<AccountBox>
				<AccountRow>
					<AccountLogo>
						{accountType === 'msgraph' && <MicrosoftLogo/>}
						{accountType === 'gcal' && <GoogleLogo/>}
					</AccountLogo>
					{profile ? (
						<div>
							<h1>{profile.displayName}</h1>
							<ul>
								{profile.email && <li><EmailIcon label="Email"/><span>{profile.email}</span></li>}
								{profile.timeZone && <li><RecentIcon label="Timezone"/><span>{profile.timeZone}</span></li>}
							</ul>
							<Button onClick={handleLogout} appearance="primary" label="Log out"/>
						</div>
					) : (
						<div>
							<h1>{title} Account</h1>
							<Button href={`${SERVER_URL}/${accountType}/auth/login`} appearance="primary" label="Log in"/>
						</div>
					)}
				</AccountRow>
			</AccountBox>
		</Container>
	);
};

export default AccountPage;

