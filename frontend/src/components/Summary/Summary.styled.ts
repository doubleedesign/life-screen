import styled from 'styled-components';
import { Block, FlexRow } from '../common';
import { transparentize } from 'polished';

export const SummaryWrapper = styled.section<{color?: string}>`
    background: ${props => transparentize(0.8, props.theme.colors.primary)};
	padding: ${props => props.theme.spacing.md} 0;
	
	${FlexRow} {
		align-items: unset;
	}
	
	${Block} {
		width: 100%;
		text-align: left;
		display: flex;
		
		div {
			width: 100%;
            padding: 0 ${props => props.theme.spacing.md};
			
			p {
				margin-bottom: ${props => props.theme.spacing.sm};
				
				&:first-child {
					font-size: ${props => props.theme.fontSizes.md};
					font-weight: ${props => props.theme.fontWeights.semibold};
					
					strong {
						color: ${props => props.color ? props.color : 'inherit'};
					}
				}
				
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
`;
