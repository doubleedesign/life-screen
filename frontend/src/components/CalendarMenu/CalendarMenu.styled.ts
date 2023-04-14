import styled, { css } from 'styled-components';
import { Block } from '../common';
import { breakpointUp } from '@doubleedesign/styled-media-queries';
export const CalendarMenuList = styled(Block).attrs({ as: 'ul' })`
	padding: 0;
	list-style: none;
	display: flex;
	flex-grow: 1;
	justify-content: flex-start;
	
	${props => breakpointUp(props.theme.breakpoints.md, css`
        width: 25%;
        flex-basis: 25%;
	`)};
	
	${props => breakpointUp(props.theme.breakpoints.lg, css`
		min-width: 15rem;
		flex-basis: 15rem;
	`)};
`;

export const CalendarMenuListItem = styled.li`
	min-width: 160px;
	flex-basis: 160px;
	margin-right: ${props => props.theme.spacing.sm};
	display: flex;
`;
