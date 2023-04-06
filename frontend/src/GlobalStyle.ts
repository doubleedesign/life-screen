// globalStyles.js
import { createGlobalStyle, ThemeProps } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: ${(props: ThemeProps<any>) => props.theme.fonts.body}; 
    }
    
    h1 {
	    margin-top: 0;
    }
`;

export default GlobalStyle;
