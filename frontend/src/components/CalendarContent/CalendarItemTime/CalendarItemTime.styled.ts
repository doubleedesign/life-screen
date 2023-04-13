import styled from 'styled-components';
import { CalendarItemStyleProps } from '../CalendarContent.styled';
import { transparentize } from 'polished';

// @ts-ignore
export const CalendarItemTimeWrapper = styled.div<CalendarItemStyleProps>`
    min-width: 95px;
    flex-shrink: 0;
    padding: ${props => props.theme.spacing.md};
    padding-left: ${props => props.theme.spacing.xl};
    margin-right: ${props => props.theme.spacing.sm};
    text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	
    svg {
        font-size: 1.25rem;
	    margin-bottom: ${props => props.theme.spacing.xs};
	    z-index: 10;
    }
	
	.time {
        font-size: ${props => props.theme.fontSizes.sm};
		line-height: 1.4;
		z-index: 10;
		font-weight: ${props => props.theme.fontWeights.semibold};
		
		&--description {
			font-size: ${props => props.theme.fontSizes.xs};
			text-transform: uppercase;
            font-weight: ${props => props.theme.fontWeights.normal};
		}
	}

    .time-of-day-icon {
		color: ${props => props?.colors ? props.colors.secondary : props.theme.colors.body};
	    position: absolute;
	    inset: 0 0 0 0;
	    left: 2px;
	    display: flex;
        justify-content: flex-start;
	    align-items: center;
	    z-index: 0;
	    opacity: 0.2;
	    
	    svg {
		    height: 70%;
		    width: auto;
		    margin-left: ${props => props.theme.spacing.md};
	    }
    }
`;
