import styled from 'styled-components';
import { shade, tint } from 'polished';
export const PopupMenuWrapper = styled.div`
	position: relative;
`;

export const PopupMenuContentWrapper = styled.div<{$height: number}>`
	position: absolute;
	top: 100%;
	right: 0;
	height: ${props => `${props.$height}px`};
	transition: height 0.3s ease;
	overflow: hidden;
	min-width: 15rem;
	background: ${props => {
		if(props.theme.name === 'dark') {
			return tint(0.1, props.theme.colours.subtle);
		}
		return tint(0.5, props.theme.colours.background);
	}};
	border-radius: ${props => props.theme.spacing.xs};
	box-shadow: ${props => {
		if(props.theme.name === 'dark') {
			return shade(0.4, props.theme.colours.subtle);
		}
		return shade(0.4, props.theme.colours.subtle);
	}} 0 0 0.5rem 0;
	z-index: 100;
`;

export const PopupMenuContent = styled.div`
	padding: ${props => props.theme.spacing.sm};
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
`;
