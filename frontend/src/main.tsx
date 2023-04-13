import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faS,
	faCircleCheck,
	faCalendarStar,
	faArrowsRotate,
	faEyeSlash,
	faArrowRotateRight,
	faClockOne,
	faClockTwo,
	faClockThree,
	faClockFour,
	faClockFive,
	faClockSix,
	faClockSeven,
	faClockEight,
	faClockNine,
	faClockTen,
	faClockEleven,
	faClockTwelve,
	faClockOneThirty,
	faClockTwoThirty,
	faClockThreeThirty,
	faClockFourThirty,
	faClockFiveThirty,
	faClockSixThirty,
	faClockSevenThirty,
	faClockEightThirty,
	faClockNineThirty,
	faClockTenThirty,
	faClockElevenThirty,
	faClockTwelveThirty,
	faHourglassClock
} from '@fortawesome/pro-solid-svg-icons';
import {
	faL,
	faCircleCheck as faLCircleCheck,
} from '@fortawesome/pro-light-svg-icons';
import {
	fad,
	faCloudSun,
	faCloudsMoon,
	faMoonStars,
	faHouseNight,
	faCalendarClock
} from '@fortawesome/pro-duotone-svg-icons';

// @ts-ignore
library.add(
	faS,
	faL,
	fad,
	faCircleCheck,
	faLCircleCheck,
	faCalendarStar,
	faArrowsRotate,
	faEyeSlash,
	faArrowRotateRight,
	faClockOne,
	faClockTwo,
	faClockThree,
	faClockFour,
	faClockFive,
	faClockSix,
	faClockSeven,
	faClockEight,
	faClockNine,
	faClockTen,
	faClockEleven,
	faClockTwelve,
	faClockOneThirty,
	faClockTwoThirty,
	faClockThreeThirty,
	faClockFourThirty,
	faClockFiveThirty,
	faClockSixThirty,
	faClockSevenThirty,
	faClockEightThirty,
	faClockNineThirty,
	faClockTenThirty,
	faClockElevenThirty,
	faClockTwelveThirty,
	faHourglassClock,
	faCloudSun,
	faCloudsMoon,
	faMoonStars,
	faHouseNight,
	faCalendarClock
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
