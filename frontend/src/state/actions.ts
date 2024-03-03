import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { RootState } from './types.ts';

const initialState: RootState = {
	msgraph: undefined,
	gcal: undefined
};

// Action types
export const SET_MICROSOFT_USER = 'SET_MICROSOFT_USER';

type SetUserIdAction = {
	type: typeof SET_MICROSOFT_USER,
	payload: {
		userId: string,
	}
};

// Action creators
export const setMicrosoftUser = (userId: string) => ({
	type: SET_MICROSOFT_USER,
	payload: {
		userId: userId,
	}
});

// Reducer
function credentialsReducer(state: RootState = initialState, action: SetUserIdAction){
	switch (action.type) {
	case SET_MICROSOFT_USER:
		return {
			...state,
			msgraph: {
				...state.config?.msgraph,
				userId: action.payload.userId
			}
		};
	default:
		return state;
	}
}

const logger = createLogger();

export const store= configureStore({
	reducer: {
		config: credentialsReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
