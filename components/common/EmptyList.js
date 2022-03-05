import React from "react";
import styledComponents from "styled-components";

const Container = styledComponents.div`
    padding: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
function EmptyList(props) {
  return <Container {...props}>{props.children}</Container>;
}

export default EmptyList;
