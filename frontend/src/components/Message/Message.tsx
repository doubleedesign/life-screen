import { FC, PropsWithChildren } from 'react';
import { MessageWrapper } from './Message.style';

interface MessageProps {
	type: 'success' | 'error' | 'warning' | 'info';
}

const Message: FC<PropsWithChildren<MessageProps>> = ({ type, children }) => {
	return (
		<MessageWrapper data-testid="Message" type={type}>
			{children}
		</MessageWrapper>
	);
};

export default Message;

