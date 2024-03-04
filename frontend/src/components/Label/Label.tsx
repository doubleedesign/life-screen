import { FC } from 'react';
import { LabelWrapper } from './Label.style';
import { ThemeColour } from '../../theme.ts';

interface LabelProps {
	appearance: ThemeColour;
	text: string;
}

const Label: FC<LabelProps> = ({ appearance, text }) => {
	return (
		<LabelWrapper data-testid="Label" $appearance={appearance}>
			{text}
		</LabelWrapper>
	);
};

export default Label;

