import styled, { css } from 'styled-components';
import { Block, FlexRow } from '../CommonLayout';
import { breakpointUp } from '@doubleedesign/styled-media-queries';

export const GlobalHeaderWrapper = styled.header`
	background: ${({ theme }): string => theme.colors.dark};
	padding: ${({ theme }): string => theme.spacing.md};
	color: white;
	
	${FlexRow} {
		align-items: center;
		text-align: center;
		
		${Block} {
			width: 100%;
			flex-basis: 100%;
			padding-top: ${({ theme }): string => theme.spacing.xs};
			padding-bottom: ${({ theme }): string => theme.spacing.xs};
			font-size: ${({ theme }): string => theme.fontSizes.sm};

            ${props => breakpointUp(props.theme.breakpoints.md, css`
		        width: auto;
		        flex-basis: auto;
		    `)};
			
			&:nth-child(2) {
                ${props => breakpointUp(props.theme.breakpoints.md, css`
		        	margin-left: auto;
		    	`)};
			}

            h1 {
                font-size: ${({ theme }): string => theme.fontSizes.lg};
            }
		}
	}
`;
