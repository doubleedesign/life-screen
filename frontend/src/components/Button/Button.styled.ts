import styled from 'styled-components';
import { darken, meetsContrastGuidelines } from 'polished';

export const StyledButton = styled.button`
	font-family: ${({ theme }): string => theme.fonts.body};
	font-weight: ${({ theme }): string => theme.fontWeights.semibold};
    display: inline-block;
    appearance: none;
    border: 0;
	background: ${({ theme }): string => theme.colors.primary};
	color: ${({ theme }): string => meetsContrastGuidelines(theme.colors.primary, '#fff') ? '#fff' : '#000'};
	padding: ${({ theme }): string => theme.spacing.sm} ${({ theme }): string => theme.spacing.lg};;
    border-radius: 0.25rem;
	text-decoration: underline;
	text-decoration-color: transparent;
	transition: all 0.3s ease;
	cursor: pointer;
	
	&:hover, &:focus, &:active {
        background: ${({ theme }): string => darken(0.1, theme.colors.primary)};
	};
	
	&:focus {
        text-decoration-color: currentColor;
	}
`;
