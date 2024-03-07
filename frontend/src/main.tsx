import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/actions.ts';
import App from './App.tsx';
import { MicrosoftAccountPage, GoogleAccountPage } from './components/Accounts/AccountPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		children: [
			{
				path: '/msgraph',
				element: <MicrosoftAccountPage title="Microsoft" accountType="msgraph"/>
			},
			{
				path: '/gcal',
				element: <GoogleAccountPage title="Google" accountType="gcal"/>
			}
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</React.StrictMode>
);
