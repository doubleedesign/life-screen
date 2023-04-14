import React, { FC, useContext } from 'react';
import { GlobalHeaderWrapper } from './GlobalHeader.styled';
import { LOGOUT_URL } from '../../constants';
import { StyledButtonLink } from '../ButtonLink/ButtonLink.styled';
import { Block, FlexRow } from '../common';
import { CalendarContext } from '../../CalendarContext';

const GlobalHeader: FC = () => {
	const { user } = useContext(CalendarContext);

	return (
		<GlobalHeaderWrapper data-testid="GlobalHeader">
			<FlexRow>
				<Block>
					<h1>LifeScreen</h1>
				</Block>
				<Block>
					<span>{user?.mail} &nbsp;</span>
					<StyledButtonLink size="sm" color="dark" href={LOGOUT_URL}>Log out</StyledButtonLink>
				</Block>
			</FlexRow>
		</GlobalHeaderWrapper>
	);
};

export default GlobalHeader;
