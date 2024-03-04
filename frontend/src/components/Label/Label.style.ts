import styled from 'styled-components';
import { ThemeColour } from '../../theme.ts';
import { readableColor } from 'polished';
export const LabelWrapper = styled.span<{$appearance: ThemeColour}>`
	display: inline-block;
	padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
	border-radius: ${props => props.theme.spacing.xs};
	background: ${props => props.theme.colours[props.$appearance]};
	color: ${props => readableColor(props.theme.colours[props.$appearance])};
	font-size: ${props => props.theme.fontSizes.xxs};
	text-transform: uppercase;
	font-weight: ${props => props.theme.fontWeights.semibold};
`;
