import styled from 'styled-components';
import { contrastTextColour } from '../../theme-utils';
import { darken } from 'polished';

interface CheckboxWrapperProps {
	checked: boolean;
	color: string;
}

export const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
	width: 6rem;
	display: flex;
	justify-content: center;
	align-items: flex-end;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    margin: 0 ${props => props.theme.spacing.xs};
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
        display: block;
        font-size: ${props => props.theme.fontSizes.sm};
        font-weight: ${props => props.theme.fontWeights.light};
        cursor: pointer;
        color: ${props => props.checked ? contrastTextColour(props.color) : props.color};
        opacity: ${props => props.checked ? '1' : '0.25'};
        transition: all 0.3s ease;

        &:hover, &:focus-within, &:active {
            opacity: 1;
        }

        img, svg.fa-calendar-star {
            display: block;
            width: 3rem;
            height: 3rem;
            margin: 0 auto ${({ theme }): string => theme.spacing.sm};
        }

        svg.fa-calendar-star {
	        width: 2.8rem;
	        height: 2.8rem;
        }

        svg {
            margin-right: ${props => props.theme.spacing.xs};
        }
    }
`;
