import {Switch, Route} from "react-router-dom";

import Test from "./components/Test";
import Login from "./pages/Login";

function App() {
	return (
		<>
			<Switch>
				<Route path="/login/:token">
					<Test />
				</Route>

				<Route path="/" exact>
					<Login />
				</Route>

				<Route path="" />
			</Switch>
		</>
	);
}

export default App
