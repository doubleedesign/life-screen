import styled from 'styled-components';
import { Row } from '../../common.styled.ts';
import { lighten, darken } from 'polished';

export const AccountBox = styled.div`
	background: ${props => lighten(0.1, props.theme.colours.background)};
	padding: ${props => props.theme.spacing.md};
	box-shadow: 0 0 0.25rem 0 ${props => darken(0.5, props.theme.colours.background)};

	h1 {
		font-size: ${props => props.theme.fontSizes.lg};
		margin: 0;
	}
	
	ul {
		padding: 0;
		list-style: none;
		margin: 0;
		margin-top: ${props => props.theme.spacing.sm};
		
		li {
			font-size: ${props => props.theme.fontSizes.md};
			margin-bottom: ${props => props.theme.spacing.xs};
			display: flex;
			align-items: center;
			
			svg {
				height: 1.25rem;
				width: 1.25rem;
			}
		}
	}
	
	button, a {
		margin-top: ${props => props.theme.spacing.md};
		margin-left: auto;
	}
`;

export const AccountLogo = styled.div`
	
`;

export const AccountRow = styled(Row)`
	justify-content: flex-start;
	align-items: flex-start;
	
	div {
		padding-right: ${props => props.theme.spacing.sm};
	}
`;
