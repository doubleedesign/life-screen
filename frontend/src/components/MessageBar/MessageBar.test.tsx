import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MessageBar from './MessageBar';

describe('<MessageBar />', () => {
	test('it should mount', () => {
		render(<MessageBar/>);

		const messageBar = screen.getByTestId('MessageBar');

		expect(messageBar).toBeInTheDocument();
	});
});
