import { FC, PropsWithChildren, ReactNode, useRef } from 'react';
import { PopupMenuContent, PopupMenuContentWrapper, PopupMenuWrapper } from './PopupMenu.style';
import { useResize } from '../../hooks/useResize.ts';

interface PopupMenuProps {
	isOpen: boolean;
	trigger: ReactNode;
}

const PopupMenu: FC<PropsWithChildren<PopupMenuProps>> = ({ isOpen, trigger, children }) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const { height } = useResize(contentRef, [isOpen]);

	return (
		<PopupMenuWrapper data-testid="PopupMenu">
			{trigger}
			<PopupMenuContentWrapper $height={height} data-testid="PopupMenuContentWrapper">
				{isOpen && (
					<PopupMenuContent ref={contentRef} data-testid="PopupMenuContent">
						{children}
					</PopupMenuContent>
				)}
			</PopupMenuContentWrapper>
		</PopupMenuWrapper>
	);
};

export default PopupMenu;

