import React from "react";
import {useParams} from "react-router-dom";
import client from "../API";

export default function Test() {
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
				setIntel(user.data.data)
			} catch (error) {
				console.log(error.response);
			}
		}
		getUser()
	}, [token]);

	return (
		<pre>
			{JSON.stringify(intel, null,2)}
		</pre>
	);
}
