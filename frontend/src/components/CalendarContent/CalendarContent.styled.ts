import styled, { css } from 'styled-components';
import { Block, FlexRow } from '../common';
import { breakpointUp } from '@doubleedesign/styled-media-queries';

export interface CalendarItemStyleProps {
	colors?: {
		primary: string;
		secondary: string;
	}
}

export const CalendarContentWrapper = styled(FlexRow).attrs({ as: 'main' })`
    padding-top: ${props => props.theme.spacing.md};
    flex-grow: 1;

    ${props => breakpointUp(props.theme.breakpoints.md, css`
        width: 75%;
        flex-basis: 75%;
	`)};
	
	${props => breakpointUp(props.theme.breakpoints.lg, css`
		width: auto;
		flex-basis: auto;
	`)};
	
	h2 {
		color: ${props => props.theme.colors.body};
		margin-bottom: ${props => props.theme.spacing.sm};
	}
	
	${Block} {
        ${props => breakpointUp(props.theme.breakpoints.lg, css`
		        width: 30%;
		        flex-basis: 30%;
			`)};
		
		&:first-of-type {
            ${props => breakpointUp(props.theme.breakpoints.lg, css`
		        width: 70%;
		        flex-basis: 70%;
			`)};
		}
	}
`;

export const CalendarItemList = styled.ul`
`;
