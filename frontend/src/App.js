import './App.css';
import axios from "axios";
const SERVER_URL = 'http://localhost:4000';

function App() {

	const test = axios.get('http://localhost:4000/calendar').then((response) => {
		//console.log(response);
		return response;
	})
	.catch((error) => {
		//console.error(error);
	})

	console.log(test);


	return (
		<div className="App">
			<header className="App-header">
				<a href={`${SERVER_URL}/auth/signin`}>Log in</a>
			</header>
		</div>
	);
}

export default App;
