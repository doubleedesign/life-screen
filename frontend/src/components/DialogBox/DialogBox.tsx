import React, { FC, PropsWithChildren } from 'react';
import { DialogBoxWrapper } from './DialogBox.styled';

interface DialogBoxProps {
	size: string;
	title?: string;
	color?: string
}

const DialogBox: FC<PropsWithChildren<DialogBoxProps>> = ({  size, title, color, children }) => (
	<DialogBoxWrapper size={size} data-testid="DialogBox" color={color}>
		{title && <header>{title}</header>}
		{children}
	</DialogBoxWrapper>
);

export default DialogBox;
