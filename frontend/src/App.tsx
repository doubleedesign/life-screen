import GlobalHeader from './components/GlobalHeader/GlobalHeader.tsx';
import { Outlet } from 'react-router-dom';

function App() {

	return (
		<>
			<GlobalHeader/>
			<Outlet/>
		</>
	);
}

export default App;
