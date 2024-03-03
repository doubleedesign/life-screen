import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Toggle from './Toggle';

describe('<Toggle />', () => {
	test('it should mount', () => {
		render(<Toggle/>);

		const toggle = screen.getByTestId('Toggle');

		expect(toggle).toBeInTheDocument();
	});
});
