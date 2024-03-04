import styled from 'styled-components';
import { transparentize } from 'polished';
export const AccountsMenuWrapper = styled.ul`
	margin: 0;
	padding: 0;
`;

export const AccountsMenuItem = styled.li`
	display: flex;
	
	a {
		display: flex;
		margin-left: -${props => props.theme.spacing.sm};
		margin-right: -${props => props.theme.spacing.sm};
		align-items: center;
		justify-content: space-between;
		flex-grow: 1;
		padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
		color: ${props => props.theme.colours.text};
		font-size: ${props => props.theme.fontSizes.sm};
		font-weight: ${props => props.theme.fontWeights.normal};
		text-decoration-color: transparent;
		transition: all 0.3s ease;
		
		&:hover, &:focus, &:active {
			background: ${props => transparentize(0.9, props.theme.colours.text)};
		}
		
		&:focus-visible {
			text-decoration-color: currentColor;
		}
		
		> span {
			display: inline-flex;
			align-items: center;
			
			svg {
				vertical-align: unset;
				margin-right: ${props => props.theme.spacing.xs};
			}
		}
	}
`;
