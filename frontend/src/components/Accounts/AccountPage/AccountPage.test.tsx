import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountPage from './AccountPage.tsx';

describe('<AccountPage />', () => {
	test('it should mount', () => {
		render(<AccountPage title="Microsoft" accountType="msgraph"/>);

		const account = screen.getByTestId('Account');

		expect(account).toBeInTheDocument();
	});
});
