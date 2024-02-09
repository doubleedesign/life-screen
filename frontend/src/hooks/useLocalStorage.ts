import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): { value: T; setValue: Dispatch<SetStateAction<T>> } {
	const [value, setValue] = useState(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return localStorage?.getItem(key) ? JSON.parse(localStorage.getItem(key) as any) : defaultValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return { value, setValue };
}
