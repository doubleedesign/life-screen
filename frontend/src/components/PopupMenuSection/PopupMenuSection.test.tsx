import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PopupMenuSection from './PopupMenuSection';

describe('<PopupMenuSection />', () => {
	test('it should mount', () => {
		render(<PopupMenuSection/>);

		const popupMenuSection = screen.getByTestId('PopupMenuSection');

		expect(popupMenuSection).toBeInTheDocument();
	});
});
