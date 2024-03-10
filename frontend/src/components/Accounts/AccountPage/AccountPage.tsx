import { FC, useEffect } from 'react';
import { IdType } from '../../../state/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '../../../hooks/useLocalStorage.ts';
import { parseHash } from '../../../utils.ts';
import { setUserId } from '../../../state/actions.ts';
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

		// Just logged out
		if (window.location.pathname === `/${accountType}/logout`) {
			token.setValue('');
		}

		// Only run on load; if deps are set then the server his hit with repeated requests
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


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
					<Button href={`${SERVER_URL}/${accountType}/auth/logout`} appearance="primary" label="Log out"/>
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

