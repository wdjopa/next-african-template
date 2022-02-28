import React from "react";
import styledComponents from "styled-components";
import ZigZag from "../icons/ZigZag";

// const ZigZag = styledComponents.div`
//   position: absolute;
//   bottom: -45px;
//   height: 100%;
//   width: 100%;
//   background-size: cover;
//   background-repeat: no-repeat !important;
//   background: url('/zigzag.svg');
// `;

const StyledTitle = styledComponents.div`
  color: black;
  text-align:center;
  display: inline-flex;
  align-items: center;
  justify-content:center;
  width: auto;
  min-height: 60px;
  border-radius: 5px;
  position:relative;
  overflow: hidden;
  font-size: 3rem;
  font-weight: 400;
`;

function DesignedTitle(props) {

return (
    <StyledTitle {...props} >
      {props.children}
      <ZigZag style={{position: "absolute",bottom: "0px"}}/>
    </StyledTitle>
  );
}

export default DesignedTitle;
