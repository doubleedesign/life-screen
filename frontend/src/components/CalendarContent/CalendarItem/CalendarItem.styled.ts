import styled from 'styled-components';
import { CalendarItemStyleProps } from '../CalendarContent.styled';

export const CalendarItemWrapper = styled.li<CalendarItemStyleProps>`
	display: flex;
	align-items: center;
	background: white;
	width: 100%;
	margin-bottom: ${props => props.theme.spacing.md};
	padding-right: ${props => props.theme.spacing.md};
    box-shadow: 0 0 0.5rem 0 #B8B8B8;
	border-radius: 0.5rem;
	border-left: 1rem solid ${props => props?.colors?.primary};
`;

export const CalendarItemImage = styled.div<CalendarItemStyleProps>`
	width: 2rem;
	height: 2rem;
	margin-right: ${props => props.theme.spacing.sm};
	
	img, svg {
		height: 100%;
		width: auto;
		display: block;
		margin: 0 auto;
	}
	
	.fa-calendar-star {
		color: ${props => props?.colors?.primary};
	}
`;

export const CalendarItemContent = styled.div<CalendarItemStyleProps>`
	flex-grow: 1;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	
	h3 {
		font-size: ${props => props.theme.fontSizes.md};
		font-weight: ${props => props.theme.fontWeights.semibold};
		color: ${props => props?.colors?.secondary};
        margin: ${props => props.theme.spacing.xs} 0;
	}
	
	p {
		width: 100%;
		flex-basis: 100%;
        color: ${props => props.theme.colors.body};
		font-size: ${props => props.theme.fontSizes.sm};
        margin-bottom: ${props => props.theme.spacing.xs};
	}

    .react-tooltip-trigger {
        display: inline-block;
        padding: ${props => props.theme.spacing.xs};
	    color: ${props => props.theme.colors.body};
	    margin-left: ${props => props.theme.spacing.md};

        + .react-tooltip {
            transition: opacity 0.3s ease, visibility 0.3s ease !important;
	        transition-delay: 0.1s;
        }
	    
	    &__fadeIn {
            + .react-tooltip {
                opacity: 1;
	            visibility: visible;
            }
	    }

        &__fadeOut {
            + .react-tooltip {
                opacity: 0;
	            visibility: hidden;
            }
        }
    }
`;
