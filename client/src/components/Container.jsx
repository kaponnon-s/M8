import React from "react";
import styled from "styled-components";

function Container({className, children}) {
	return <main className={className}>{children}</main>;
}

export default styled(Container)`
	font-family: "Segoe UI";
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
