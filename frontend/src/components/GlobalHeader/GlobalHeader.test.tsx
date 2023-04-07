import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../test-utils/test-utils';
import { screen } from '@testing-library/react';
import GlobalHeader from './GlobalHeader';

describe('<GlobalHeader />', () => {
	test('it should mount', () => {
		const mockUser = {
			id: '123',
			displayName: 'Chandler Bing',
			mail: 'chick@acrossthehall.com',
			userPrincipalName: 'chick@acrossthehall.com',
			'@odata.context': '"https://graph.microsoft.com/v1.0/$metadata#users(displayName,mail,mailboxSettings,userPrincipalName)/$entity"'
		};

		render(<GlobalHeader userData={mockUser}/>);

		const globalHeader = screen.getByTestId('GlobalHeader');

		expect(globalHeader).toBeInTheDocument();
	});
});
