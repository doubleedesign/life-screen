import styled from 'styled-components';
import { FlexRow, Block } from '../common';

export const GlobalSubheaderWrapper = styled.div`
	padding: ${props => props.theme.spacing.md} 0;
	background: white;
    box-shadow: 0 0 0.5rem 0 ${props => props.theme.colors.dark};
	position: relative;
	z-index: 10;
`;

export const CalendarUtilityBar = styled(FlexRow)`
	width: 100%;
	flex-basis: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	${Block} {
		display: flex;
	}
`;

export const CalendarWeekCount = styled.form`
    margin: 0 ${props => props.theme.spacing.md};
    display: flex;
    flex-wrap: nowrap;
	align-items: center;
    border-radius: 0.25rem;
    border: 1px solid ${props => props.theme.colors.dark};

    label {
        font-size: ${props => props.theme.fontSizes.sm};
        padding: ${props => props.theme.spacing.sm};
    }

    input {
	    width: 4rem;
        background: transparent;
        border: 0;
        padding: ${props => props.theme.spacing.sm};
        font-family: ${props => props.theme.fonts.body};
	    font-size: ${props => props.theme.fontSizes.md};
	    font-weight: ${props => props.theme.fontWeights.semibold};
        display: block;
        height: 100%;
    }
`;
