import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

import axios from "axios";
import "boxicons";

function SendEmail({className}) {
	const [email, setEmail] = React.useState("");
	const [message, setMessage] = React.useState("");

	async function sendEmail(event) {
		event.preventDefault();
		try {
			const data = await axios.post("http://localhost:5000/api/user/sendEmail", {email});
			console.log(data.data);
			setMessage(data.data.message);
			alert(data.data.message);
		} catch (error) {
			alert("Not found email.");
		}
	}

	return (
		<form id="create-form" onSubmit={sendEmail} className={className}>
			<h1>Avo</h1>
			<h2>Forgot your password</h2>
			<div className="input-group">
				<input
					name="email"
					type="email"
					id="email"
					value={email}
					placeholder="Email"
					onChange={(event) => setEmail(event.target.value)}
				/>
				<box-icon name="envelope" type="solid"></box-icon>
			</div>
			<button type="submit">SEND</button>
			<p>{message}</p>
			<Link to="">
				<box-icon name="arrow-back"></box-icon>Back to login page
			</Link>
		</form>
	);
}

export default styled(SendEmail)`
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
	a {
		color: rgba(0, 0, 0, 0.7);
		font-size: 100%;
		position: relative;
		box-icon {
			position: absolute;
			left: -20%;
		}
	}
	a:hover {
		color: rgba(56, 163, 165, 1);
	}
`;
