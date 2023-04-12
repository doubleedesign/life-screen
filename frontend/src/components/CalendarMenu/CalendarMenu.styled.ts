import styled, { css } from 'styled-components';
import { Block } from '../CommonLayout';
import { breakpointUp } from '@doubleedesign/styled-media-queries';
export const CalendarMenuList = styled(Block).attrs({ as: 'ul' })`
	padding-top: ${props => props.theme.spacing.md};
	list-style: none;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex-basis: 100%;
	
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
	width: 100%;
`;
