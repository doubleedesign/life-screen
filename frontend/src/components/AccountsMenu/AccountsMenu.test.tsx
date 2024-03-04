import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountsMenu from './AccountsMenu';

describe('<AccountsMenu />', () => {
	test('it should mount', () => {
		render(<AccountsMenu/>);

		const accountsMenu = screen.getByTestId('AccountsMenu');

		expect(accountsMenu).toBeInTheDocument();
	});
});
