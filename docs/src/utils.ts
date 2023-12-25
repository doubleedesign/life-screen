export function titleCase(str: string) {
	return str.split(/[-_\s]+/g).map(word => ucFirst(word)).join(' ');
}

export function ucFirst(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
