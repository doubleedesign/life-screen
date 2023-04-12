import styled from 'styled-components';

interface CalendarItemStyleProps {
	colors?: {
		primary: string;
		secondary: string;
	}
}

export const CalendarItemWrapper = styled.li<CalendarItemStyleProps>`
	display: flex;
	align-items: center;
	background: white;
	width: 100%;
	margin-bottom: ${props => props.theme.spacing.md};
	padding: ${props => props.theme.spacing.md};
    box-shadow: 0 0 0.5rem 0 #B8B8B8;
	border-radius: 0.5rem;
	border-left: 1rem solid ${props => props?.colors?.secondary};
`;

export const CalendarItemImage = styled.div<CalendarItemStyleProps>`
	width: 2rem;
	height: 2rem;
	margin-right: ${props => props.theme.spacing.md};
	
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
	
	h3 {
		font-size: ${props => props.theme.fontSizes.default};
		font-weight: ${props => props.theme.fontWeights.semibold};
		color: ${props => props?.colors?.secondary};;
	}
`;
