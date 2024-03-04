import styled from 'styled-components';
import { transparentize } from 'polished';
export const PopupMenuSectionWrapper = styled.div`
	padding-top: ${props => props.theme.spacing.sm};
	padding-bottom: ${props => props.theme.spacing.xs};
	border-bottom: 1px solid ${props => transparentize(0.8, props.theme.colours.text)};
	
	&:first-child {
		padding-top: 0;
	}
	
	&:last-child {
		border-bottom: 0;
		padding-bottom: 0;
	}
`;

export const PopupMenuSectionTitle = styled.label`
	display: block;
	text-transform: uppercase;
	font-weight: ${props => props.theme.fontWeights.semibold};
	font-size: ${props => props.theme.fontSizes.xs};
	margin-bottom: ${props => props.theme.spacing.xs};
`;
