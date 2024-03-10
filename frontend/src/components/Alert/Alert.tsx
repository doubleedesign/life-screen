import { FC, PropsWithChildren } from 'react';
import { AlertWrapper } from './Alert.style';
import CloseButton from '../CloseButton/CloseButton';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
	type: AlertType;
	onDismiss?: () => void;
}

const Alert: FC<PropsWithChildren<AlertProps>> = ({ type, onDismiss, children }) => {
	return (
		<AlertWrapper data-testid="Alert" type={type}>
			{children}
			{onDismiss && <CloseButton onClick={onDismiss}/>}
		</AlertWrapper>
	);
};

export default Alert;

