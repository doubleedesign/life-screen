import { FC, PropsWithChildren } from 'react';
import { PopupMenuSectionTitle, PopupMenuSectionWrapper } from './PopupMenuSection.style';

interface PopupMenuSectionProps {
	title: string;
}

const PopupMenuSection: FC<PropsWithChildren<PopupMenuSectionProps>> = ({ title, children }) => {
	return (
		<PopupMenuSectionWrapper data-testid="PopupMenuSection">
			<PopupMenuSectionTitle>{title}</PopupMenuSectionTitle>
			{children}
		</PopupMenuSectionWrapper>
	);
};

export default PopupMenuSection;

