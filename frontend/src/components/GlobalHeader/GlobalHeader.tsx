import React, { FC } from 'react';
import { GlobalHeaderWrapper } from './GlobalHeader.styled';
import { LOGOUT_URL } from '../../constants';
import { User } from '../../../types';
import { StyledButtonLink } from '../ButtonLink/ButtonLink.styled';

interface GlobalHeaderProps {
	userData: User | null
}

const GlobalHeader: FC<GlobalHeaderProps> = ({ userData }) => {

	return (
		<GlobalHeaderWrapper data-testid="GlobalHeader">
			<h1>LifeScreen</h1>
			<span>{userData?.mail}</span>
			<StyledButtonLink href={LOGOUT_URL}>Log out</StyledButtonLink>
		</GlobalHeaderWrapper>
	);
};

export default GlobalHeader;
