import React from "react";

export default function Login() {
	return (
		<div className="App">
			<button
				onClick={() => {
					window.open(`http://localhost:5000/api/user/loginFacebook`, "_parent");
				}}
				value="loginFacebook">
				Facebook
			</button>
			<button
				onClick={() => {
					window.open(`http://localhost:5000/api/user/loginGoogle`, "_parent");
				}}
				value="loginGoogle">
				Google
			</button>
			<button
				onClick={() => {
					window.open(`http://localhost:5000/api/user/loginTwitter`, "_parent");
				}}
				value="loginTwitter">
				Twitter
			</button>
		</div>
	);
}
