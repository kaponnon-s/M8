import React from "react";
import {useParams, useHistory} from "react-router-dom";
import styled from "styled-components";
import client from "../API";

function ResetPassword({className}) {
	const [password, setPassword] = React.useState();
	const [confirmPassword, setConfirmPassword] = React.useState();
	const {token} = useParams();

	const history = useHistory();

	async function onSubmit(event) {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("password and confirm password don't same pass");
		} else {
			try {
				await client.put(
					"/user/setPassword",
					{password},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				history.push("")
			} catch (error) {
				alert(error);
			}
		}
	}

	return (
		<form id="create-form" onSubmit={onSubmit} className={className}>
			<h1>Reset password</h1>
			<div className="input-group">
				<input
					name="username"
					type="password"
					id="password"
					value={password}
					placeholder="password"
					onChange={(event) => setPassword(event.target.value)}
				/>
			</div>

			<div className="input-group">
				<input
					name="type"
					type="password"
					id="confirmPassword"
					value={confirmPassword}
					placeholder="confirmPassword"
					onChange={(event) => setConfirmPassword(event.target.value)}
				/>
			</div>

			<button type="submit">SUBMIT</button>
		</form>
	);
}

export default styled(ResetPassword)`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	box-shadow: 1px 1px 4px 0.1px rgba(0, 0, 0, 0.7);
	border-radius: 0.5rem;
	padding: 3%;
	button {
		width: 80%;
		padding: 0.2rem 0;
		font-size: 80%;
		font-weight: 900;
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
		}
	}
`;
