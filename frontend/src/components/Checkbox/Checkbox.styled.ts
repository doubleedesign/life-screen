import styled from 'styled-components';

interface CheckboxWrapperProps {
	checked: boolean
}

export const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
	padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
	margin: 0 ${props => props.theme.spacing.xs};
	background: ${props => props.theme.colors.light};
	border: 2px solid ${props => props.checked ? props.theme.colors.accent : props.theme.colors.light};
    border-radius: 0.25rem;
	cursor: pointer;
	transition: all 0.3s ease;
	
	input {
		position: absolute;
        height: 0;
		width: 0;
		opacity: 0;
	}
	
	label {
		font-size: ${props => props.theme.fontSizes.default};
		font-weight: ${props => props.theme.fontWeights.semibold};
        cursor: pointer;
		color: ${props => props.checked ? props.theme.colors.accent : props.theme.colors.body};
		opacity: ${props => props.checked ? '1' : '0.25'};
		transition: all 0.3s ease;
		
		&:hover, &:focus-within, &:active {
			opacity: 1;
		}
		
		svg {
			margin-right: ${props => props.theme.spacing.xs};
		}
	}
`;
