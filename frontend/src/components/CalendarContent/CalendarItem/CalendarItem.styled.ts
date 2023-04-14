import styled from 'styled-components';
import { CalendarItemStyleProps } from '../CalendarContent.styled';
import { StyledIconButton } from '../../Button/Button.styled';

export const CalendarItemWrapper = styled.li<CalendarItemStyleProps>`
	display: flex;
	background: white;
	width: 100%;
	margin-bottom: ${props => props.theme.spacing.md};
	padding-right: ${props => props.theme.spacing.md};
    box-shadow: 0 0 0.5rem 0 #B8B8B8;
	border-radius: 0.5rem;
	border-left: 1rem solid ${props => props?.colors?.primary};

    button {
        align-self: center;
    }
`;

export const CalendarItemImage = styled.div<CalendarItemStyleProps>`
	width: 2rem;
	height: 2rem;
	margin-right: ${props => props.theme.spacing.sm};
	align-self: center;
	
	img, svg {
		height: 100%;
		width: auto;
		display: block;
		margin: 0 auto;
	}
	
	.fa-calendar-star {
		color: ${props => props?.colors?.primary};
	}

    ${StyledIconButton} {
        margin-left: auto;
    }
`;

export const CalendarItemContent = styled.div<CalendarItemStyleProps>`
	flex-grow: 1;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	align-self: center;
	
	h3 {
		font-size: ${props => props.theme.fontSizes.md};
		font-weight: ${props => props.theme.fontWeights.semibold};
		color: ${props => props?.colors?.secondary};
		margin: ${props => props.theme.spacing.xs} 0;
		
		.react-tooltip-trigger {
			line-height: 1;
            margin-left: ${props => props.theme.spacing.sm};
            color: ${props => props.theme.colors.body};
		}
	}
	
	p {
		width: 100%;
		flex-basis: 100%;
        color: ${props => props.theme.colors.body};
		font-size: ${props => props.theme.fontSizes.sm};
		margin-bottom: ${props => props.theme.spacing.xs};
	}
`;
