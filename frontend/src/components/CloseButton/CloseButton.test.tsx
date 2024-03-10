import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CloseButton from './CloseButton';

describe('<CloseButton />', () => {
	test('it should mount', () => {
		render(<CloseButton/>);

		const closeButton = screen.getByTestId('CloseButton');

		expect(closeButton).toBeInTheDocument();
	});
});
