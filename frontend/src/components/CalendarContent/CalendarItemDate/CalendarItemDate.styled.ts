import styled from 'styled-components';
import { CalendarItemStyleProps } from '../CalendarContent.styled';
import { contrastTextColour } from '../../../theme-utils';

export const CalendarItemDateWrapper = styled.div<CalendarItemStyleProps>`
	min-width: 90px;
	max-width: 90px;
	flex-basis: 90px;
	flex-shrink: 0;
	background: ${props => props.colors ? props.colors.secondary: props.theme.colors.body};
    color: ${props => contrastTextColour(props.colors ? props.colors.secondary : props.theme.colors.body)};
    padding: ${props => props.theme.spacing.md};
	text-align: center;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	align-content: center;
	justify-content: center;
	
	.day {
		flex-basis: 100%;
		font-size: ${props => props.theme.fontSizes.md};
		font-weight: ${props => props.theme.fontWeights.semibold};
	}
	
	.date, .month {
		display: inline-block;
		padding: 0 1px;
		font-size: ${props => props.theme.fontSizes.sm};
	}
`;
