import styled, { css } from 'styled-components';
import { Block } from '../common';
import { breakpointUp } from '@doubleedesign/styled-media-queries';

export interface CalendarItemStyleProps {
	colors?: {
		primary: string;
		secondary: string;
	}
}

export const CalendarContentWrapper = styled(Block).attrs({ as: 'main' })`
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
`;

export const CalendarUtilityBar = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: ${props => props.theme.spacing.md};
`;

export const CalendarWeekCount = styled.form`
	background: white;
    margin: 0 ${props => props.theme.spacing.md};
    display: flex;
    flex-wrap: nowrap;
	align-items: center;
    border-radius: 0.25rem;
    border: 1px solid ${props => props.theme.colors.dark};

    label {
        font-size: ${props => props.theme.fontSizes.sm};
        padding: ${props => props.theme.spacing.sm};
    }

    input {
	    width: 4rem;
        background: transparent;
        border: 0;
        padding: ${props => props.theme.spacing.sm};
        font-family: ${props => props.theme.fonts.body};
	    font-size: ${props => props.theme.fontSizes.md};
	    font-weight: ${props => props.theme.fontWeights.semibold};
        display: block;
        height: 100%;
    }
`;

export const CalendarItemList = styled.ul`
`;
