import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';

export const StyledButtonLink = styled(StyledButton).attrs({
	as: 'a',
})<{ href: string }>``;
