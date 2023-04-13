// globalStyles.js
import { createGlobalStyle, ThemeProps } from 'styled-components';
import { lighten } from 'polished';

const GlobalStyle = createGlobalStyle`
	:root {
        --rt-opacity: 1.0;
	}
	
	* {
        margin: 0;
        padding: 0;
		box-sizing: border-box;
	}
	
    body {
        background: ${props => lighten(0.03, props.theme.colors.light)};
        font-family: ${(props: ThemeProps<any>) => props.theme.fonts.body};
    }

    .react-tooltip {
        transition: opacity 0.3s ease, visibility 0.3s ease !important;
        transition-delay: 0.1s;
        font-weight: ${props => props.theme.fontWeights.normal};
        font-size: ${props => props.theme.fontSizes.sm};
	    line-height: 1;
    }

    .react-tooltip-trigger {
        display: inline-block;
        padding: ${props => props.theme.spacing.xs};
    }
`;

export default GlobalStyle;
