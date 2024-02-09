// Action types
import { combineReducers, createStore } from 'redux';

export const SET_MS_CREDENTIALS = 'SET_MS_CREDENTIALS';

type MSCredentialsAction = {
	type: typeof SET_MS_CREDENTIALS,
	payload: {
		userId: string,
		token: string
	}
};

// Action creators
function setMsCredentials(userId: string, token: string) {
	return {
		type: SET_MS_CREDENTIALS,
		userId: userId,
		token: token
	};
}

// Reducer
function credentialsReducer(state = {}, action: MSCredentialsAction){
	switch (action.type) {
	case SET_MS_CREDENTIALS:
		return {
			...state,
			msgraph: {
				userId: action.payload.userId,
				token: action.payload.token
			}
		};
	default:
		return state;
	}
}

export const store = createStore(combineReducers({
	credentials: credentialsReducer
}));
