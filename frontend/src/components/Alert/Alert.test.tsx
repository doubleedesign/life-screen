import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Alert from './Alert.tsx';

describe('<Message />', () => {
	test('it should mount', () => {
		render(<Alert type="info"/>);

		const message = screen.getByTestId('Message');

		expect(message).toBeInTheDocument();
	});
});
