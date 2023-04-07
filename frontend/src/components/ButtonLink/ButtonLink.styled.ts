import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';

interface ButtonLinkProps {
	href: string;
}

export const StyledButtonLink = styled(StyledButton).attrs({ as: 'a' })<ButtonLinkProps>`
	// styles
`;
