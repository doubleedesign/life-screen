import styled, { css } from 'styled-components';
import { Block } from '../CommonLayout';
import { breakpointUp } from '@doubleedesign/styled-media-queries';

export const CalendarContentWrapper = styled(Block)`
    padding-top: ${props => props.theme.spacing.md};
    width: 100%;
    flex-basis: 100%;

    ${props => breakpointUp(props.theme.breakpoints.md, css`
        width: 75%;
        flex-basis: 75%;
	`)};
	
	${props => breakpointUp(props.theme.breakpoints.lg, css`
		width: auto;
		flex-basis: auto;
	`)};
`;
