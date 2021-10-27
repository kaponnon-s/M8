import React from "react";
import {useParams} from "react-router-dom";

export default function Test() {
	const file = useParams();
    console.log(file);
	return (
		<div>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur molestias harum,
			similique nisi eveniet corrupti blanditiis ipsa dignissimos corporis, impedit dolore velit vel
			voluptas. Tempora ea debitis magnam mollitia temporibus.
		</div>
	);
}
