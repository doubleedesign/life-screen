import { FC } from 'react';
import { CloseButtonElement } from './CloseButton.style';
import CrossIcon from '@atlaskit/icon/glyph/cross';

type CloseButtonProps = {
	onClick: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ onClick }: CloseButtonProps) => {
	return (
		<CloseButtonElement data-testid="CloseButton" onClick={onClick}>
			<CrossIcon label="Close" />
		</CloseButtonElement>
	);
};

export default CloseButton;

