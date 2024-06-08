import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function useLocalStorage(key: string, defaultValue: string): { value: string; setValue: Dispatch<SetStateAction<string>> } {
	const [value, setValue] = useState<string>(localStorage.getItem(key) ?? defaultValue);

	useEffect(() => {
		localStorage.setItem(key, value);
	}, [key, value]);

	return { value, setValue };
}
