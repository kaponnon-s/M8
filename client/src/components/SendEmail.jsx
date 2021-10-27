import React from "react";
import client from "../API";

export default function SendEmail() {

    async function sendEmail() {
        try {
            await client.post("/user")
        } catch (error) {
            console.log(error);
        }
    }

	return (
		<button
			onClick={sendEmail}
			value="sendEmail">
			Send request password
		</button>
	);
}
