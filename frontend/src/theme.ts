const defaults = {
	colours: {
		primary: '#54428E',
		secondary: '#007bc5',
		success: '#00bd99',
		error: '#e15477',
		warning: '#F0A202',
		info: '#8972c4',
		light: '#f3f3f3',
		mutedLight: '#d3d3d3',
		mutedDark: '#3d3742',
		subtle: '#d3d3d3',
		dark: '#1a1a1a',
	},
	fonts: {
		body: '\'Fira Sans\', \'sans-serif\'',
	},
	fontSizes: {
		xxs: '0.6rem',
		xs: '0.75rem',
		sm: '0.875rem',
		md: '1rem',
		lg: '1.25rem',
		xl: '1.5rem',
		xxl: '2rem',
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
			text: '#2f2f2f',
			subtle: defaults.colours.mutedLight,
		}
	}
} as ThemeObject;
