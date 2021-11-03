import React from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import client from "../API";

function Display({className}) {
	const [intel, setIntel] = React.useState();
	const {token} = useParams();

	React.useEffect(() => {
		async function getUser() {
			try {
				const user = await client.get("/user/showUser", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setIntel(user.data.data);
			} catch (error) {
				console.log(error.response);
			}
		}
		getUser();
	}, [intel, token]);

	return <div className={className}>{intel ? <Detail data={intel} /> : <h1>Not found</h1>}</div>;
}

function Detail({data}) {
	const [checkPro, setCheckPro] = React.useState(1);
	const [color, setColor] = React.useState("");
	const [name, setName] = React.useState("");

	React.useEffect(() => {
		if (data.provider === "facebook") setName("facebook-circle");
		else if (data.provider === "google") setName("google-plus-circle") ;
		else if (data.provider === "twitter") setName("twitter") ;
		else setName("user");
	}, [data.provider]);

	React.useEffect(() => {
		if (data.provider === "facebook") setColor("#4867AA") ;
		else if (data.provider === "google") setColor("#E34133") ;
		else if (data.provider === "twitter") setColor("#3FA6DA") ;
		else setColor("black");
	}, [data.provider]);

	React.useEffect(() => {
		function check(provider) {
			if (provider === "นนท์เอง") setCheckPro(0);
		}
		check(data.provider);
	}, [data]);

	return (
		<>
			{checkPro ? (
				<>
					<box-icon name={name} type="logo" color={color} size="md">
						{data.provider}
					</box-icon>
					{/* <h1>{data.id}</h1> */}
					<h1>{data.displayName}</h1>
				</>
			) : (
				<>
					<box-icon name={name} type="solid" color={color} size="md">
						{data.provider}
					</box-icon>
					{/* <h1>{data.id}</h1> */}
					<h1>{data.username}</h1>
				</>
			)}
		</>
	);
}

export default styled(Display)`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	box-shadow: 1px 1px 4px 0.1px rgba(0, 0, 0, 0.7);
	border-radius: 0.5rem;
	padding: 3%;

	box-icon {
		margin: 0 5px;
		transition: 1s;

		:hover {
			border-radius: 2rem;
			box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
			transition: 1s;
		}
	}
`;
