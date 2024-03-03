import styled from 'styled-components';
import { ThemeColour } from '../../theme.ts';
import { meetsContrastGuidelines, shade, tint } from 'polished';
export const ButtonWrapper = styled.button<{appearance: ThemeColour, collapsed?: boolean, active?: boolean}>`
	padding: ${props => props.theme.spacing.sm} ${props => props.collapsed ? props.theme.spacing.sm : props.theme.spacing.md};
	background: ${props => {
		if(props.active) {
			if(props.theme.name === 'dark') {
				return tint(0.3, props.theme.colours[props.appearance]);
			}
			return shade(0.2, props.theme.colours[props.appearance]);
		}
		return props.theme.colours[props.appearance];
	}};
	color: ${props => {
		const scores = meetsContrastGuidelines(props.theme.colours[props.appearance], props.theme.colours.text);
		return scores.AA ? props.theme.colours.text : props.theme.colours.background;
	}};
	appearance: none;
	line-height: 1;
	font-weight: ${props => props.theme.fontWeights.semibold};
	font-family: ${props => props.theme.fonts.body};
	border: 0;
	border-radius: ${props => props.theme.spacing.xs};
	cursor: pointer;
	transition: background 0.2s;
	display: inline-flex;
	align-items: center;    
	justify-content: center;
	
	svg {
		margin-right: ${props => props.collapsed ? 0 : props.theme.spacing.xs};
	}
	
	&:hover, &:focus, &:active {
		background: ${props => {
		if(props.theme.name === 'dark') {
			return tint(0.3, props.theme.colours[props.appearance]);
		}
		return shade(0.2, props.theme.colours[props.appearance]);
	}};
	}
`;

export const LinkButtonWrapper = styled(ButtonWrapper).attrs({ as: 'a' })``;
