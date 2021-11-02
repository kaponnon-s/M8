import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";
import "boxicons";

function SendEmail({className}) {
	const [email, setEmail] = React.useState("");

	async function sendEmail(event) {
		event.preventDefault();
		try {
			await axios.post("http://localhost:5000/api/user/sendEmail", {email});
			alertSuccess();
		} catch (error) {
			alertError("Not found email.");
		}
	}

	function alertError(err) {
		Swal.fire({
			icon: "error",
			title: "Error Invalid Information",
			text: `${err}`,
		});
	}

	async function alertSuccess() {
		await Swal.fire({
			icon: "success",
			title: "Send Email Success!",
			timer: 2000,
			showConfirmButton: false,
		});
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
