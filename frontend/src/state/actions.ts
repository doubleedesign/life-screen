import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { RootState, SetUserIdActionPayload, SetUserProfileActionPayload } from './types.ts';
import { omit } from 'lodash';

const initialState: RootState = {
	config: {
		msgraph: undefined,
		gcal: undefined
	},
	ui: {
		darkMode: true
	}
};

// Action types
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_UI_MODE = 'SET_UI_MODE';

type SetUserIdAction = {
	type: typeof SET_USER_ID,
	payload: SetUserIdActionPayload
};

type SetUserProfileAction = {
	type: typeof SET_USER_PROFILE,
	payload: SetUserProfileActionPayload
};

type SetUiModeAction = {
	type: typeof SET_UI_MODE,
	payload: 'light' | 'dark'
};

// Action creators
export const setUserId = (data: SetUserIdActionPayload) => ({
	type: SET_USER_ID,
	payload: data
});

export const setUserProfile = (data: SetUserProfileActionPayload) => ({
	type: SET_USER_PROFILE,
	payload: data
});

export const setUiMode = (darkMode: boolean) => ({
	type: SET_UI_MODE,
	payload: darkMode
});

// Reducer
function configReducer(state = initialState.config, action: SetUserIdAction | SetUserProfileAction){
	switch (action.type) {
	case SET_USER_ID:
		return {
			...state,
			[action.payload.idType]: {
				userId: action.payload.id
			}
		};
	case SET_USER_PROFILE:
		// TODO: Handle passed ID not matching the current ID in the state
		return {
			...state,
			[action.payload.idType]: {
				...omit(action.payload, 'idType')
			}
		};
	default:
		return state;
	}
}

function UiReducer(state = initialState.ui, action: SetUiModeAction) {
	switch (action.type) {
	case SET_UI_MODE:
		return {
			...state,
			darkMode: action.payload
		};
	default:
		return state;
	}
}

const logger = createLogger();

export const store= configureStore({
	reducer: combineReducers({
		config: configReducer,
		ui: UiReducer
	}),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
