import styled from 'styled-components';
import { contrastTextColour } from '../../theme-utils';
import { darken } from 'polished';

interface CheckboxWrapperProps {
	checked: boolean;
	color: string;
}

export const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
	width: 100%;
    padding: ${props => props.theme.spacing.sm};
    margin: ${props => props.theme.spacing.xs} 0;
    background: ${props => props.checked ? props.color : props.theme.colors.light};
    border: 2px solid ${props => props.checked ? darken(0.2, props.color) : props.theme.colors.light};
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.3s ease;

    input {
        position: absolute;
        height: 0;
        width: 0;
        opacity: 0;
    }

    label {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        font-size: ${props => props.theme.fontSizes.sm};
        font-weight: ${props => props.theme.fontWeights.light};
        cursor: pointer;
        color: ${props => props.checked ? contrastTextColour(props.color) : props.color};
        opacity: ${props => props.checked ? '1' : '0.25'};
        transition: all 0.3s ease;

        &:hover, &:focus-within, &:active {
            opacity: 1;
        }
	    
	    span {
		    display: inline-flex;
		    align-items: center;
		    justify-content: center;
		    width: 2rem;
		    padding-right: ${props => props.theme.spacing.sm};
	    }

        img {
            height: 2rem;
	        width: auto;
        }
	    
	    .fa-calendar-star,
	    .icon-rmit {
		    height: 1.8rem;
	    }
	    
        .fa-circle-check {
	        order: 3;
	        margin-left: auto;
        }
    }
`;
