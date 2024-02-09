import { FC } from 'react';
import { GlobalHeaderWrapper } from './GlobalHeader.styled';
import { Container } from '../common.styled';

interface GlobalHeaderProps {
}

const GlobalHeader: FC<GlobalHeaderProps> = () => (
	<GlobalHeaderWrapper data-testid="GlobalHeader">
		<Container>
			<h1>GlobalHeader Component</h1>
		</Container>
	</GlobalHeaderWrapper>
);

export default GlobalHeader;
