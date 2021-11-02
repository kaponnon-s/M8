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
		console.log(intel);
	}, [intel, token]);

	return <div className={className}>{intel ? <Detail data={intel} /> : <h1>Not found</h1>}</div>;
}

function Detail({data}) {
	const [checkPro, setCheckPro] = React.useState(1);

	function check(provider) {
		if (provider === "นนท์เอง") setCheckPro(0);
	}

	React.useEffect(() => {
		check(data.provider);
	}, [data]);

	return (
		<>
			{checkPro ? (
				<>
					<h1>{data.id}</h1>
					<h1>{data.displayName}</h1>
					<box-icon
						name={data.provider}
						type="logo"
						size="md">
						{data.provider}
					</box-icon>
				</>
			) : (
				<>
					<h1>{data.id}</h1>
					<h1>{data.username}</h1>
					<box-icon type='solid' name='user' size="md">{data.provider}</box-icon>
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
`;
