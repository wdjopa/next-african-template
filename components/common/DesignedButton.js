import React from "react";
import styledComponents from "styled-components";

const ZigZag = styledComponents.div`
position: absolute;
 bottom: -45px;
 height: 100%;
 width: 100%;
 background-repeat-y: no-repeat !important;
 background: url('/zigzag.svg');
`;

const StyledButton = styledComponents.div`

    background: ${(props) => (props.secondary ? "white" : "black")};
    color: ${(props) => (props.secondary ? "black" : "white")};
    border:2px solid black;
    text-align:center;
    display: inline-flex;
    align-items: center;
    justify-content:center;
    min-width: 200px;
    width: ${props => props.full ? "100%" : "auto"};
    min-height: 60px;
    border-radius: 5px;
    box-shadow: 2px 2px 0px black; 
    position:relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0px 3px 3px 0px #00000040;
    font-size: 1.3rem;
    font-weight: 400;
    padding: 0 3rem;
`;

function DesignedButton(props) {

return (
    <StyledButton {...props} secondary={props.secondary}>
      {props.children}
      <ZigZag />
    </StyledButton>
  );
}

export default DesignedButton;
