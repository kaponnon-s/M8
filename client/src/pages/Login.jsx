import React from "react";
import SocialButton from "../components/SocialButton";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import Swal from "sweetalert2";

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
			alertSuccess("Login success!");
		} catch (error) {
			if (error.response) {
				alertError(error.response.data.error);
			} else alertError(error);
		}
	}
	function alertError(err) {
		Swal.fire({
			icon: "error",
			title: "Error Invalid Information",
			text: `${err}`,
		});
	}

	async function alertSuccess(data) {
		await Swal.fire({
			icon: "success",
			title: "Success!",
			text: `${data}`,
			timer: 1500,
			showConfirmButton: false,
		});
		history.push(`/login/${localStorage.getItem("token")}`);
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
					placeholder="Username"
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>

			<div className="input-group">
				<input
					name="type"
					type="password"
					id="type"
					value={password}
					placeholder="Password"
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
		padding: 0.5rem 0;
		font-size: 100%;
		font-weight: bold;
		color: white;
		border-radius: 0.3rem;
		border: 0.5px solid rgba(0, 0, 0, 0.1);
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
		background: rgb(34, 87, 122);
		transition: 0.3s;
		cursor: pointer;
		background: linear-gradient(
			150deg,
			rgba(34, 87, 122, 1) 0%,
			rgba(56, 163, 165, 1) 50%,
			rgb(60, 177, 87) 76%,
			rgba(128, 237, 153, 1) 100%
		);
		:hover {
			border: 1px solid rgba(0, 0, 0, 0.5);
			transform: translateY(-5px);
			box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
			transition: 0.3s;
		}
	}
	.input-group {
		margin-bottom: 12%;
		width: 90%;
		input {
			width: 100%;
			border: none;
			border-bottom: 1px solid rgba(0, 0, 0, 0.7);
			padding: 0 0 3% 0;
			outline: none;
			font-size: 100%;
			:focus {
				border-bottom: 1px solid rgba(60, 177, 87, 0.7);
				transition: 0.5s;
			}
		}
	}
	.link {
		width: 100%;
		display: flex;
		padding: 20% 0 0 0;
		justify-content: space-between;
		transition: 0.5s;

		a {
			color: rgba(0, 0, 0, 0.7);
			font-size: 100%;
			font-weight: 500;
		}
		a:hover {
			color: rgba(56, 163, 165, 1);
			transition: 0.5s;
		}
	}
`;
