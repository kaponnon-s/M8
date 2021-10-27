import {Switch, Route} from "react-router-dom";
import Test from "./components/Test";

function App() {
	async function onSubmit(event) {
		event.preventDefault();
		try {
			window.open(`http://localhost:5000/api/user/loginFacebook`);
		} catch (error) {
			console.log("err");
		}
	}

	return (
		<>
			<Switch>
				<Route path="/admin/:filename">
          <Test/>
				</Route>

				<Route path="/" exact>
				</Route>

				<Route path="">
				</Route>

			</Switch>
		</>
	);
	// return <div className="App">
	//   <button onClick={onSubmit}>Click me!!</button>
	// </div>;
}

export default App;
