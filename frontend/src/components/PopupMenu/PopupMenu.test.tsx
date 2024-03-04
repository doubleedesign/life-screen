import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PopupMenu from './PopupMenu';

describe('<PopupMenu />', () => {
	test('it should mount', () => {
		render(<PopupMenu/>);

		const popupMenu = screen.getByTestId('PopupMenu');

		expect(popupMenu).toBeInTheDocument();
	});
});
