import React, { FC } from 'react';
import { GlobalHeaderWrapper } from './GlobalHeader.styled';
import { LOGOUT_URL } from '../../constants';
import { User } from '../../types';
import { StyledButtonLink } from '../ButtonLink/ButtonLink.styled';
import { Block, FlexRow } from '../common';

interface GlobalHeaderProps {
	userData: User | null
}

const GlobalHeader: FC<GlobalHeaderProps> = ({ userData }) => {

	return (
		<GlobalHeaderWrapper data-testid="GlobalHeader">
			<FlexRow>
				<Block>
					<h1>LifeScreen</h1>
				</Block>
				<Block>
					<span>{userData?.mail}</span>
				</Block>
				<Block>
					<StyledButtonLink size="sm" color="dark" href={LOGOUT_URL}>Log out</StyledButtonLink>
				</Block>
			</FlexRow>
		</GlobalHeaderWrapper>
	);
};

export default GlobalHeader;
