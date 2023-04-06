import React, { FC, PropsWithChildren } from 'react';
import { DialogBoxHeader, DialogBoxWrapper } from './DialogBox.styled';

interface DialogBoxProps {
	size: string;
	title: string;
}

const DialogBox: FC<PropsWithChildren<DialogBoxProps>> = ({  size, title, children }) => (
	<DialogBoxWrapper size={size} data-testid="DialogBox">
		{title && <DialogBoxHeader>{title}</DialogBoxHeader>}
		{children}
	</DialogBoxWrapper>
);

export default DialogBox;
