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
