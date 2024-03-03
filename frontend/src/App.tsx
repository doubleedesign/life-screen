import GlobalHeader from './components/GlobalHeader/GlobalHeader.tsx';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme.ts';
import GlobalStyle from './components/global.style.ts';
import { useIsDarkMode } from './state/selectors.ts';

function App() {
	const mode = useIsDarkMode() ? 'dark' : 'light';
	const currentTheme = theme[mode] ?? theme['dark'];

	return (
		<ThemeProvider theme={currentTheme}>
			<GlobalStyle />
			<GlobalHeader/>
			<Outlet/>
		</ThemeProvider>
	);
}

export default App;
