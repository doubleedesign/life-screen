import { RootState } from './state/types.ts';

export const SERVER_URL = 'http://localhost:3001';

export const initialState: RootState = {
	config: {
		msgraph: {
			userId: localStorage.getItem('msgraph_id'),
		},
		gcal: {
			userId: localStorage.getItem('gcal_id'),
		}
	},
	ui: {
		darkMode: localStorage.getItem('darkmode') === 'true',
		messages: []
	}
};
