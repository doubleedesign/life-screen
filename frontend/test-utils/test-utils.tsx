import React, { ReactElement } from 'react';
import { theme } from '../src/theme';
import { ThemeProvider } from 'styled-components';
import { render, RenderOptions } from '@testing-library/react';

const RenderWithTheme = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: RenderWithTheme, ...options });

export * from '@testing-library/react';
export { customRender as render };
