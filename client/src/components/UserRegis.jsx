import React from "react";
import styled from "styled-components";
import {useHistory, Link} from "react-router-dom";
import client from "../API";
import Swal from "sweetalert2";

function UserRegis({className}) {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState();
	const [email, setEmail] = React.useState("");

	const history = useHistory();

	async function onSubmit(event) {
		event.preventDefault();
		if (password !== confirmPassword) {
			alertError("Your password and confirm password not match");
		} else {
			try {
				await client.post("/user/register", {username, password, email});
				alertSuccess("Registration  success!");
			} catch (error) {
				if (error.response.data.message) alertError(error.response.data.data.errors[0].message);
				else alertError(error);
			}
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
		history.push("");
	}
	
	return (
		<form id="create-form" onSubmit={onSubmit} className={className}>
			<h1>Register</h1>

			<div className="back">
				<label>Already have an account?</label>
				<Link to="">Login</Link>
			</div>

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

			<div className="input-group">
				<input
					name="type"
					type="password"
					id="confirmPassword"
					value={confirmPassword}
					placeholder="Confirm your password"
					onChange={(event) => setConfirmPassword(event.target.value)}
				/>
			</div>

			<div className="input-group">
				<input
					name="email"
					type="email"
					id="email"
					value={email}
					placeholder="Email"
					onChange={(event) => setEmail(event.target.value)}
				/>
			</div>

			<button type="submit">SUBMIT</button>
		</form>
	);
}

export default styled(UserRegis)`
	width: 20rem;
	height: 33rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	box-shadow: 1px 1px 4px 0.1px rgba(0, 0, 0, 0.7);
	border-radius: 0.5rem;
	padding: 3%;
	.back {
		padding: 0 5%;
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
	label {
		font-size: 100%;
		color: rgba(0, 0, 0, 0.7);
		margin-bottom: 10%;
	}
	.input-group {
		display: flex;
		margin: 10% 0;
		width: 100%;
		position: relative;
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
	a {
		color: rgba(0, 0, 0, 0.7);
		font-size: 100%;
		font-weight: bold;
		position: relative;
	}
	a:hover {
		color: rgba(56, 163, 165, 1);
		transition: 0.5s;
	}
`;
