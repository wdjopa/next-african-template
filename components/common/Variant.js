import React from "react";
import styledComponents from "styled-components";

const VariantContainer = styledComponents.div`
    margin-bottom: 1.5rem;
`;

const VariantTitle = styledComponents.h5`
`;

const VariantOptions = styledComponents.div`
    display: flex;
    flex-wrap: wrap;
`;

const ColorCircle = styledComponents.div`
    border-radius: 100%;
    margin-right: .5rem;
    width: 30px;
    height: 30px;
    background: ${(props) => props.color};
    border: 2px solid ${(props) => (props.active ? "black" : "transparent")};
    cursor: pointer;

    &:hover{
        border: 2px solid gray;
    }
`;

const Pill = styledComponents.div`
    background: #CCC;
    border-radius: 4px;
    line-height: 2px;
    color: white;
    width: 50px; 
    height: 30px;
    margin-right: .5rem;
    align-items:center;
    display: flex;
    justify-content: center;
    cursor: pointer;

    &:hover{
    background: #BBB;
    }
`;

function Variant({ variant }) {
  return (
    <VariantContainer>
      <VariantTitle>{variant.name}</VariantTitle>
      <VariantOptions>
        {variant?.name?.toLocaleLowerCase() === "color" &&
          variant.options.map((option) => {
            return <ColorCircle color={option.value} active={false} key={option.id || option.key || Math.random()} />;
          })}
        {variant?.name?.toLocaleLowerCase() !== "color" &&
          variant.options.map((option) => {
            return <Pill key={option.id || option.key || Math.random()}>{option.value}</Pill>;
          })}
      </VariantOptions>
    </VariantContainer>
  );
}
export default Variant;
