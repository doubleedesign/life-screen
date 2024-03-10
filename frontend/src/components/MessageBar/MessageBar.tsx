import { FC, useEffect } from 'react';
import { Container } from '../common.styled.ts';
import { getMessages } from '../../state/selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import Alert, { AlertType } from '../Alert/Alert.tsx';
import { Message } from '../../types.ts';
import { clearMessage } from '../../state/actions.ts';

const MessageBar: FC = () => {
	const messages: Message[] = useSelector(getMessages());
	const dispatch = useDispatch();

	useEffect(() => {
		const timeout = setTimeout(() => {
			Object.values(messages).forEach((message: Message) => {
				if(message.code >= 200 && message.code < 300) {
					dispatch(clearMessage(message.key));
				}
			});
		}, 5000);

		return () => clearTimeout(timeout);
	}, [dispatch, messages]);

	return (
		<Container data-testid="MessageBar">
			{messages && Object.values(messages).map((message: Message) => {
				let type: AlertType = 'info';
				if(message.code >= 200 && message.code < 300) {
					type = 'success' as AlertType;
				}
				if(message.code >= 400) {
					type = 'error' as AlertType;
				}

				return (
					<Alert key={message.key} type={type} onDismiss={() => dispatch(clearMessage(message.key))}>
						<p><strong>{message.code}</strong>{message.message}</p>
					</Alert>
				);
			})}
		</Container>
	);
};

export default MessageBar;

