import {Switch, Route} from "react-router-dom";

import Display from "./components/Display";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forget from "./pages/Forget";

import "./App.css"

function App() {
	return (
		<>
			<Switch>
				<Route path="/login/:token">
					<Display />
				</Route>

				<Route path="/forget-password">
					<Forget />
				</Route>

				<Route path="/register">
					<Register />
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
