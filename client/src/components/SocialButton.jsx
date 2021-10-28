import React from "react";
import styled from "styled-components";

import "boxicons";


function SocialButton({className}) {
	return (
		<div className={className}>
			<box-icon
				name="facebook-circle"
				type="logo"
				color="#4867AA"
				onClick={() => {
					window.open(`http://localhost:5000/api/user/loginFacebook`, "_parent");
				}}
				value="loginFacebook">
				Facebook
			</box-icon>

			<box-icon
				name="google-plus-circle"
				type="logo"
				color="#E34133"
				onClick={() => {
					window.open(`http://localhost:5000/api/user/loginGoogle`, "_parent");
				}}
				value="loginGoogle">
				Google
			</box-icon>

			<box-icon
				name="twitter"
				type="logo"
				color="#3FA6DA"
				onClick={() => {
					window.open(`http://localhost:5000/api/user/loginTwitter`, "_parent");
				}}
				value="loginTwitter">
				Twitter
			</box-icon>
		</div>
	);
}

export default styled(SocialButton)`
	display: flex;
	justify-content: center;
	box-icon{
		margin: 0 5px;   
	}
`;
