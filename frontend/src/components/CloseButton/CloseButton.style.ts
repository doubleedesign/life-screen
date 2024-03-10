import styled from 'styled-components';
export const CloseButtonElement = styled.button`
	border: 0;
	background: transparent;
	appearance: none;
	cursor: pointer;
	
	svg {
		height: ${props => props.theme.fontSizes.md};
		transition: all 0.2s ease;
	}
	
	&:hover, &:focus, &:active {
		svg {
			color: ${props => props.theme.colours.primary};
			fill: ${props => props.theme.colours.primary};
		}
	}
`;
