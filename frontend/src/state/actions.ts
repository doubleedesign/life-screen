import { initialState } from '../constants.tsx';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { IdType, SetUserIdActionPayload, SetUserProfileActionPayload } from './types.ts';
import { omit } from 'lodash';
import { Message } from '../types.ts';


// Action types
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const CLEAR_USER_ACCOUNT = 'CLEAR_USER_PROFILE';
export const SET_UI_MODE = 'SET_UI_MODE';
export const SET_MESSAGE = 'SET_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

type SetUserIdAction = {
	type: typeof SET_USER_ID,
	payload: SetUserIdActionPayload
};

type SetUserProfileAction = {
	type: typeof SET_USER_PROFILE,
	payload: SetUserProfileActionPayload
};

type ClearUserAccountAction = {
	type: typeof CLEAR_USER_ACCOUNT,
	payload: IdType
};

type SetUiModeAction = {
	type: typeof SET_UI_MODE,
	payload: 'light' | 'dark'
};

type SetMessageAction = {
	type: typeof SET_MESSAGE,
	payload: Message
};

type ClearMessageAction = {
	type: typeof CLEAR_MESSAGE,
	payload: string // key
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

export const clearUserAccount = (idType: string) => ({
	type: CLEAR_USER_ACCOUNT,
	payload: {
		idType,
	}
});

export const setUiMode = (darkMode: boolean) => ({
	type: SET_UI_MODE,
	payload: darkMode
});

export const setMessage = (message: Message) => ({
	type: SET_MESSAGE,
	payload: message
});

export const clearMessage = (key: string) => ({
	type: CLEAR_MESSAGE,
	payload: key
});

// Reducer
function configReducer(state = initialState.config, action: SetUserIdAction | SetUserProfileAction | ClearUserAccountAction){
	switch (action.type) {
	case SET_USER_ID:
		localStorage.setItem(`${action.payload.idType}_id`, action.payload.id);
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
	case CLEAR_USER_ACCOUNT:
		localStorage.removeItem(`${action.payload}_id`);
		localStorage.removeItem(`${action.payload}_token`);
		return {
			...state,
			[action.payload]: undefined
		};
	default:
		return state;
	}
}

function UiReducer(state = initialState.ui, action: SetUiModeAction | SetMessageAction | ClearMessageAction) {
	switch (action.type) {
	case SET_UI_MODE:
		localStorage.setItem('darkmode', action.payload);
		return {
			...state,
			darkMode: action.payload
		};
	case SET_MESSAGE:
		return {
			...state,
			messages: {
				...state.messages,
				[action.payload.key]: action.payload
			}
		};
	case CLEAR_MESSAGE:
		return {
			...state,
			messages: omit(state.messages, action.payload)
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
