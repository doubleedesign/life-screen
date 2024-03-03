import { createSelector } from '@reduxjs/toolkit';

type IdType = 'msgraph' | 'gcal';

const makeGetConfig = createSelector([(state) => state], (state) => state.config);

export const selectUserId = (idType: IdType) => createSelector(
	[makeGetConfig],
	(config) => {
		return config[idType].userId;
	}
);
