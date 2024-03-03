const defaults = {
	colours: {
		primary: '#be82f3',
		secondary: '#82bef3',
		success: '#56e5a4',
		error: '#d55064',
		warning: '#f3d682',
		info: '#82bef3',
		light: '#f3f3f3',
		mutedLight: '#d3d3d3',
		mutedDark: '#3d3742',
		subtle: '#d3d3d3',
		dark: '#1a1a1a',
	},
	fonts: {
		body: '\'Fira Sans\', \'sans-serif\'',
	},
	fontWeights: {
		light: 300,
		normal: 400,
		semibold: 600,
	},
	spacing: {
		xs: '0.25rem',
		sm: '0.5rem',
		md: '1rem',
		mdLg: '1.25rem',
		lg: '1.5rem',
	}
};

type ThemeObject = {
	dark: typeof defaults & {
		name: string;
	};
	light: typeof defaults & {
		name: string;
	};
};

export type ThemeColour = keyof typeof defaults.colours;

export default {
	dark: {
		name: 'dark',
		...defaults,
		colours: {
			...defaults.colours,
			error: '#b92941',
			background: defaults.colours.dark,
			text: defaults.colours.light,
			subtle: defaults.colours.mutedDark,
		}
	},
	light: {
		name: 'light',
		...defaults,
		colours: {
			...defaults.colours,
			background: defaults.colours.light,
			text: defaults.colours.dark,
			subtle: defaults.colours.mutedLight,
		}
	}
} as ThemeObject;
