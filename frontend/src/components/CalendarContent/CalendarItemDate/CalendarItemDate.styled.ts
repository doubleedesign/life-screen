import styled from 'styled-components';
import { CalendarItemStyleProps } from '../CalendarContent.styled';
import { contrastTextColour } from '../../../theme-utils';

export const CalendarItemDateWrapper = styled.div<CalendarItemStyleProps>`
	flex-shrink: 0;
	background: ${props => props.colors ? props.colors.secondary: props.theme.colors.body};
    color: ${props => contrastTextColour(props.colors ? props.colors.secondary : props.theme.colors.body)};
    padding: ${props => props.theme.spacing.md};
	margin-right: ${props => props.theme.spacing.sm};
	text-align: center;
	
	.day {
		display: block;
		font-size: ${props => props.theme.fontSizes.md};
		font-weight: ${props => props.theme.fontWeights.semibold};
	}
	
	.date, .month {
		display: inline-block;
		padding: 0 1px;
		font-size: ${props => props.theme.fontSizes.sm};
	}
`;
