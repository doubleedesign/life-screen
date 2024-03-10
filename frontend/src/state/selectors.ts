import { createSelector } from '@reduxjs/toolkit';
import { IdType } from './types.ts';
import { useSelector } from 'react-redux';

const makeGetConfig = createSelector([(state) => state], (state) => state.config);
const makeGetUi = createSelector([(state) => state], (state) => state.ui);

const selectIsDarkMode = () => createSelector(
	[makeGetUi],
	(ui) => {
		return ui.darkMode;
	}
);

export const useIsDarkMode = () => {
	return useSelector(selectIsDarkMode());
};

export const selectUserId = (idType: IdType) => createSelector(
	[makeGetConfig],
	(config) => {
		return config[idType]?.userId ?? undefined;
	}
);

export const selectUserProfile = (idType: IdType) => createSelector(
	[makeGetConfig],
	(config) => {
		return config[idType] ?? undefined;
	}
);

export const getMessages = () => createSelector(
	[makeGetUi],
	(ui) => {
		return ui.messages;
	}
);

