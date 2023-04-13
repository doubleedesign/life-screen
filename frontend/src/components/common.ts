import styled, { css } from 'styled-components';
import { breakpointUp } from '@doubleedesign/styled-media-queries';

export const FlexRow = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	max-width: ${props => props.theme.breakpoints.xxl}px;
	margin: 0 auto;
	
    ${props => breakpointUp(props.theme.breakpoints.lg, css`
        flex-wrap: nowrap;
    `)};
`;

export const Block = styled.div`
	padding-left: ${props => props.theme.spacing.sm};
	padding-right: ${props => props.theme.spacing.sm};

    ${props => breakpointUp(props.theme.breakpoints.lg, css`
        padding-left: ${props => props.theme.spacing.md};
        padding-right: ${props => props.theme.spacing.md};
    `)};
`;

export const ScreenReaderText = styled.span`
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
`;
