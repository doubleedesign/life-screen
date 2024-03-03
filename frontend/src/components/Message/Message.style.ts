import styled from 'styled-components';
import { darken, lighten, meetsContrastGuidelines, transparentize } from 'polished';
export const MessageWrapper = styled.div<{type: 'success' | 'error' | 'warning' | 'info'}>`
	padding: ${props => props.theme.spacing.sm};
	border: 1px solid ${props => props.theme.colours[props.type]};
	border-left-width: ${props => props.theme.spacing.xs};
	background: ${props => transparentize(0.9, props.theme.colours.light)};
	color: ${props => {
		let scores = meetsContrastGuidelines(props.theme.colours[props.type], props.theme.colours.background);
		let result = props.theme.colours[props.type];
		let tries = 0;
		while(!scores.AA && tries < 5) {
			result = props.theme.name === 'dark' ? lighten(0.2, props.theme.colours[props.type]) : darken(0.1, props.theme.colours[props.type]);
			scores = meetsContrastGuidelines(result, props.theme.colours.background);
			tries++;
		}
		return tries < 5 ? result : props.theme.colours.text;
	}};
`;
