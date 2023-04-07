export default {
	testEnvironment: 'jsdom',
	preset: 'ts-jest',
	transform: {
		'^.+\\.(ts|tsx)?$': ['ts-jest', {
			tsconfig: '<rootDir>/tsconfig.json'
		}]
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/']
};
