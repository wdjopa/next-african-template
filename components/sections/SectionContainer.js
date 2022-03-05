import React from "react";
import styledComponents from "styled-components";

const Container = styledComponents.div`
    margin: 3rem 0;
    box-sizing:border-box;
    overflow: hidden;
    width: 100%;
`;
function SectionContainer(props) {
  return <Container {...props}>{props.children}</Container>;
}

export default SectionContainer;
