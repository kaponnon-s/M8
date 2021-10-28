import {Switch, Route} from "react-router-dom";

import Display from "./components/Display";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forget from "./pages/Forget";
import ResetPass from "./pages/ResetPass";

import Container from "./components/Container";

import "./App.css";

function App() {
	return (
		<>
			<Switch>
				<Route path="/login/:token">
					<Container>
						<Display />
					</Container>
				</Route>

				<Route path="/reset-password/:token">
					<Container>
						<ResetPass />
					</Container>
				</Route>

				<Route path="/forget-password">
					<Container>
						<Forget />
					</Container>
				</Route>

				<Route path="/register">
					<Container>
						<Register />
					</Container>
				</Route>

				<Route path="/" exact>
					<Container>
						<Login />
					</Container>
				</Route>

				<Route path="" />
			</Switch>
		</>
	);
}

export default App;
