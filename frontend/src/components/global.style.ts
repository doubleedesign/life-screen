import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		font-family: ${props => props.theme.fonts.body};
		font-weight: ${props => props.theme.fontWeights.light};
		background: ${props => props.theme.colours.background};
		color: ${props => props.theme.colours.text};
	}
	
	* {
		box-sizing: border-box;
	}
	
	p {
		&:first-child {
			margin-top: 0;
		}
	}
`;

export default GlobalStyle;
