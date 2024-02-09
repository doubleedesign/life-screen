import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MicrosoftAccount from './MicrosoftAccount.tsx';

describe('<MicrosoftAccount />', () => {
	test('it should mount', () => {
		render(<MicrosoftAccount />);

		const microsoftAccount = screen.getByTestId('MicrosoftAccount');

		expect(microsoftAccount).toBeInTheDocument();
	});
});
