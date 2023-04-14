import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { ThemeColor } from '../../types';
import { contrastTextColour } from '../../theme-utils';

interface ButtonProps {
	color: ThemeColor
	size?: 'sm' | 'md'
}

export const StyledButton = styled.button<ButtonProps>`
	font-family: ${({ theme }): string => theme.fonts.body};
	font-weight: ${({ theme }): string => theme.fontWeights.semibold};
    display: inline-block;
    appearance: none;
    border: 0;
	background: ${({ theme, color }): string => theme.colors[color]};
    color: ${({ theme, color }): string => {
		if(color === 'accent') {
			return 'white';
		}
		return contrastTextColour(theme.colors[color]);
	}};
    border-radius: 0.25rem;
	text-decoration: underline;
	text-decoration-color: transparent;
	transition: all 0.3s ease;
	cursor: pointer;
    ${props => {
		if(props.size === 'sm') {
			return css`
				padding: ${props.theme.spacing.xs} ${props.theme.spacing.md};
				font-size: ${props.theme.fontSizes.sm};
				line-height: 1.5`;
		}
		else {
			return css`
				padding: ${props.theme.spacing.sm} ${props.theme.spacing.lg};
				font-size: ${props.theme.fontSizes.default}`;
		}
	}};
	
	svg {
		margin-right: ${props => props.theme.spacing.xs};
	}
	
	&:hover, &:focus, &:active {
        // theme.colors[color] may initially be "undefined" briefly when the component first loads, 
		// and we need to account for that when calling polished colour functions
        background: ${({ theme, color }): string => theme.colors[color] && darken(0.1, theme.colors[color])};
		text-decoration-color: currentColor;
	};
`;

export const StyledIconButton = styled(StyledButton)`
	padding-left: ${props => props.theme.spacing.sm};
	padding-right: ${props => props.theme.spacing.sm};
	
	.react-tooltip-trigger {
		margin-left: auto;
		margin-right: auto;
		
		svg {
			margin: 0;
		}
	}
`;
