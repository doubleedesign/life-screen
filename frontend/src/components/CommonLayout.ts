import styled, { css } from 'styled-components';
import { breakpointUp } from '@doubleedesign/styled-media-queries';

export const FlexRow = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const Block = styled.div`
	padding-left: ${props => props.theme.spacing.sm};
	padding-right: ${props => props.theme.spacing.sm};

    ${props => breakpointUp(props.theme.breakpoints.lg, css`
        padding-left: ${props => props.theme.spacing.md};
        padding-right: ${props => props.theme.spacing.md};
    `)};
`;
