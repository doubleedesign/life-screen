import styled, { css } from 'styled-components';
import { Block } from '../CommonLayout';
import { breakpointUp } from '@doubleedesign/styled-media-queries';

export const CalendarContentWrapper = styled(Block).attrs({ as: 'ul' })`
    padding-top: ${props => props.theme.spacing.md};
    flex-grow: 1;

    ${props => breakpointUp(props.theme.breakpoints.md, css`
        width: 75%;
        flex-basis: 75%;
	`)};
	
	${props => breakpointUp(props.theme.breakpoints.lg, css`
		width: auto;
		flex-basis: auto;
	`)};
`;
