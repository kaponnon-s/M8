import React from "react";
import SocialButton from "../components/SocialButton";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";

import client from "../API";

function Login({className}) {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	const history = useHistory();

	async function onSubmit(event) {
		event.preventDefault();
		try {
			const data = await client.post("/user/login", null, {
				auth: {
					username,
					password,
				},
			});
			localStorage.setItem("token", data.data.token);
			history.push(`/login/${localStorage.getItem("token")}`);
		} catch (error) {
			if (error.response) {
				console.error(error.response.data.error);
			} else console.log(error);
		}
	}

	return (
		<form id="create-form" className={className} onSubmit={onSubmit}>
			<h1>Login</h1>
			<div className="input-group">
				<input
					name="username"
					type="text"
					id="name"
					value={username}
					placeholder="username"
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>

			<div className="input-group">
				<input
					name="type"
					type="password"
					id="type"
					value={password}
					placeholder="password"
					onChange={(event) => setPassword(event.target.value)}
				/>
			</div>

			<button type="submit">LOGIN</button>

			<label>Or Sign Up Using</label>

			<SocialButton />

			<div className="link">
				<Link to={`/register`}>
					<p>Register to Avo</p>
				</Link>
				<Link to={`/forget-password`}>
					<p>Forgot password?</p>
				</Link>
			</div>
		</form>
	);
}

export default styled(Login)`
	width: 19rem;
	height: 34rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: white;
	box-shadow: 1px 1px 4px 0.1px rgba(0, 0, 0, 0.7);
	border-radius: 0.5rem;
	padding: 3%;
	h1 {
		text-align: center;
		font-size: 250%;
	}
	label {
		font-size: 100%;
		color: rgba(0, 0, 0, 0.7);
		margin-bottom: 10%;
	}
	button {
		margin-bottom: 10%;
		width: 80%;
		padding: 0.2rem 0;
		font-size: 100%;
		font-weight: bold;
		color: white;
		border-radius: 0.1rem;
		border: 0.5px solid rgba(0, 0, 0, 0.1);
		box-shadow: 1px 1px 4px 0.1px rgba(0, 0, 0, 0.3);
		background: rgb(34, 87, 122);
		background: linear-gradient(
			150deg,
			rgba(34, 87, 122, 1) 0%,
			rgba(56, 163, 165, 1) 50%,
			rgb(60, 177, 87) 76%,
			rgba(128, 237, 153, 1) 100%
		);
	}
	.input-group {
		margin-bottom: 10%;
		width: 90%;
		input {
			width: 100%;
			border: none;
			border-bottom: 1px solid rgba(0, 0, 0, 0.7);
			padding: 0 0 3% 0;
			outline: none;
			font-size: 100%;
		}
	}
	.link {
		width: 100%;
		display: flex;
		padding: 20% 0 0 0;
		justify-content: space-between;
		a {
			color: rgba(0, 0, 0, 0.7);
			font-size: 100%;
		}
		a:hover {
			color: rgba(56, 163, 165, 1);
		}
	}
`;
