import styled from 'styled-components';

export const DialogBoxWrapper = styled.section<{ size: string }>`
	background: ${({ theme }): string => theme.colors.light};
    box-shadow: 0 0 0.5rem 0 #B8B8B8;
	padding-bottom: ${({ theme }): string => theme.spacing.md};
	margin: ${({ theme }): string => theme.spacing.md} auto;
	border-radius: 0.5rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;  
    max-width: ${props => {
		if (props.size === 'md') {
			return '400px';
		}
		else {
			return '100%';
		}
	}}};
`;

export const DialogBoxHeader = styled.header`
	display: block;
	width: 100%;
	flex-basis: 100%;
	margin-bottom: ${({ theme }): string => theme.spacing.md};
	padding: ${({ theme }): string => theme.spacing.md};
    background: ${({ theme }): string => theme.colors.dark};
    color: white;
	font-weight: ${({ theme }): string => theme.fontWeights.semibold};
	border-top-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem;
`;
