import { User } from '../types.ts';

export type IdType = 'msgraph' | 'gcal';

export type RootState = {
	config: {
		msgraph?: User;
		gcal?: User;
	};
	ui: {
		darkMode: boolean;
	}
}

export type SetUserIdActionPayload = {
	id: string;
	idType: IdType;
}

export type SetUserProfileActionPayload = User & {
	idType: IdType
};
