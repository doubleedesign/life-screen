import styled from 'styled-components';

export const GlobalHeaderWrapper = styled.header`
	background: ${({ theme }): string => theme.colors.dark};
	padding: ${({ theme }): string => theme.spacing.md};
	color: white;
`;
