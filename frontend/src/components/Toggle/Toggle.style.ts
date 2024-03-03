import styled from 'styled-components';
import { ThemeColour } from '../../theme.ts';
import { readableColor } from 'polished';
export const ToggleWrapper = styled.div<{background: ThemeColour}>`
	width: ${props => `calc(${props.theme.spacing.lg} * 2)`};
	border: 1px solid ${props => readableColor(props.theme.colours[props.background])};
	display: flex;
	border-radius: ${props => props.theme.spacing.lg};
	position: relative;
	align-items: center;
	justify-content: space-around;
	background: ${props => props.theme.colours[props.background]};
	padding-left: 1px;
	padding-right: 1px;
`;

export const ToggleLabel = styled.label`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	cursor: pointer;
`;

export const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
	height: 0;
	width: 0;
	visibility: hidden;
	position: absolute;
`;

export const ToggleIconWrapper = styled.span<{background: ThemeColour}>`
	display: block;
	width: ${props => props.theme.spacing.lg};
	height: ${props => props.theme.spacing.lg};
	order: 1;
`;

export const ToggleSwitch = styled.span<{toggledOn: boolean}>`
	display: block;
	width: ${props => props.theme.spacing.mdLg};
	height: ${props => props.theme.spacing.mdLg};
	order: ${props => props.toggledOn ? 2 : 0};
	background: ${props => props.theme.colours.text};
	border-radius: ${props => props.theme.spacing.lg};
	border: 2px solid transparent;
`;
