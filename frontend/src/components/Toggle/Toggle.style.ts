import styled from 'styled-components';
import { ThemeColour } from '../../theme.ts';
import { readableColor } from 'polished';

export const ToggleLabel = styled.label<{ $labelVisible: boolean }>`
	display: block;
	position: ${props => props.$labelVisible ? 'relative' : 'absolute'};
	top: 1px; // the text just looked a little off even with flex align center
	left: 0;
	right: 0;
	bottom: 0;
	cursor: pointer;
	font-size: ${props => props.theme.fontSizes.sm};
	font-weight: ${props => props.theme.fontWeights.normal};
	z-index: 10;
`;

export const ToggleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
	height: 0;
	width: 0;
	visibility: hidden;
	position: absolute;
`;

export const ToggleSwitchWrapper = styled.button<{$background: ThemeColour}>`
	width: ${props => `calc(${props.theme.spacing.lg} * 2)`};
	border: 1px solid ${props => readableColor(props.theme.colours[props.$background])};
	border-radius: ${props => props.theme.spacing.lg};
	position: relative;
	background: ${props => props.theme.colours[props.$background]};
	padding: 1px 2px;
	z-index: 0;
	cursor: pointer;
	appearance: none;
	height: ${props => props.theme.spacing.lg};
`;

export const ToggleIconWrapper = styled.span<{$toggledOn: boolean, $background: ThemeColour}>`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: ${props => props.$toggledOn ? 'flex-start' : 'flex-end'};
	padding: 0 2px;
	
	svg {
		color: ${props => readableColor(props.theme.colours[props.$background])};
		width: 1.25rem;
		height: 1.25rem;
		max-width: 1.25rem !important;
		max-height: 1.25rem !important;
	}
`;

export const ToggleSwitch = styled.span<{$toggledOn: boolean, $background: ThemeColour}>`
	display: block;
	width: ${props => props.theme.spacing.md};
	height: ${props => props.theme.spacing.md};
	background: ${props => readableColor(props.theme.colours[props.$background])};
	border-radius: ${props => props.theme.spacing.lg};
	transform: ${props => {
		return props.$toggledOn ? `translateX(${props.theme.spacing.lg})` : 'translateX(1px)';
	}};
	transition: transform 0.3s ease;
`;
