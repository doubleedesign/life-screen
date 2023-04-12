// globalStyles.js
import { createGlobalStyle, ThemeProps } from 'styled-components';
import { lighten } from 'polished';

const GlobalStyle = createGlobalStyle`\
	* {
        margin: 0;
        padding: 0;
		box-sizing: border-box;
	}
	
    body {
        background: ${props => lighten(0.03, props.theme.colors.light)};
        font-family: ${(props: ThemeProps<any>) => props.theme.fonts.body};
    }
`;

export default GlobalStyle;
