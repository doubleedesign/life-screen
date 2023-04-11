// globalStyles.js
import { createGlobalStyle, ThemeProps } from 'styled-components';

const GlobalStyle = createGlobalStyle`\
	* {
        margin: 0;
        padding: 0;
		box-sizing: border-box;
	}
	
    body {
        font-family: ${(props: ThemeProps<any>) => props.theme.fonts.body}; 
    }
`;

export default GlobalStyle;
