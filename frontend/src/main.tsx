import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import MicrosoftAccount from './components/Accounts/MicrosoftAccount';
import { Provider } from 'react-redux';
import { store } from './state/actions.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		children: [
			{
				path: '/msgraph',
				element: <MicrosoftAccount/>
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
