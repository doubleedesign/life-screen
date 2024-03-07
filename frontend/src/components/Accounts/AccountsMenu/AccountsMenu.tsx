import { FC } from 'react';
import { AccountsMenuItem, AccountsMenuWrapper } from './AccountsMenu.style';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../../constants.tsx';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../state/selectors.ts';
import { MicrosoftLogo } from '../assets/MicrosoftLogo.tsx';
import { GoogleLogo } from '../assets/GoogleLogo.tsx';
import Label from '../../Label/Label.tsx';
import Icon from '@atlaskit/icon';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';

interface AccountsMenuProps {
	onMenuItemClick: () => void;
}

const AccountsMenu: FC<AccountsMenuProps> = ({ onMenuItemClick }) => {
	const msId = useSelector((selectUserId('msgraph')));
	const gcalId = useSelector((selectUserId('gcal')));

	return (
		<AccountsMenuWrapper data-testid="AccountsMenu">
			<AccountsMenuItem>
				<Link to={msId ? '/msgraph' : `${SERVER_URL}/msgraph/auth/login`} onClick={onMenuItemClick}>
					<span>
						<Icon glyph={MicrosoftLogo} label="Microsoft"/>
						<span>Microsoft</span>
					</span>
					{msId ? <Label appearance="success" text="Logged in"/> : <SignInIcon label="Log in"/>}
				</Link>
			</AccountsMenuItem>
			<AccountsMenuItem>
				<Link to={gcalId ? '/gcal' : `${SERVER_URL}/gcal/auth/login`} onClick={onMenuItemClick}>
					<span>
						<Icon glyph={GoogleLogo} label="Google"/>
						<span>Google</span>
					</span>
					{gcalId ? <Label appearance="success" text="Logged in"/> : <SignInIcon label="Log in"/>}
				</Link>
			</AccountsMenuItem>
		</AccountsMenuWrapper>
	);
};

export default AccountsMenu;

