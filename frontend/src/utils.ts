import { IdType } from './state/types.ts';
import { FormattedResponse } from './types.ts';
import { SERVER_URL } from './constants.tsx';

/**
 * Parse a URL hash string into an object
 * @param hash
 */
export function parseHash(hash: string): {[key: string]: string} {
	return hash.substring(1) // Remove the '#' symbol
		.split('&')
		.reduce((acc: {[key: string]: string}, keyValue) => {
			const [key, value] = keyValue.split('=');
			acc[key] = value;
			return acc;
		}, {});
}

/**
 * Fetch a user's profile from the back-end
 * @param accountType
 * @param token
 * @param userId
 */
export async function fetchProfile(accountType: IdType, token: string, userId: string): Promise<FormattedResponse> {
	const response = await fetch(`${SERVER_URL}/${accountType}/me?userId=${userId}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
	});

	return {
		ok: response.ok,
		code: response.status,
		statusText: response.statusText,
		content: await response.json()
	};
}

export async function logout(accountType: IdType, token?: string) {
	const response = await fetch(`${SERVER_URL}/${accountType}/auth/logout`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
	});

	return {
		ok: response.ok,
		code: response.status,
		statusText: response.statusText,
		content: await response.json()
	};
}
