import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faS, faCircleCheck, faCalendarStar } from '@fortawesome/pro-solid-svg-icons';
import { faL, faCircleCheck as faLCircleCheck } from '@fortawesome/pro-light-svg-icons';
// @ts-ignore
library.add(faS, faL, faCircleCheck, faLCircleCheck, faCalendarStar);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
