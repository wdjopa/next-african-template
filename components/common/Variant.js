import React from "react";
import styledComponents from "styled-components";

const VariantContainer = styledComponents.div`
    margin-bottom: 2rem;
`;

const VariantTitle = styledComponents.h5`
`;

const VariantDescription = styledComponents.p`
    margin-bottom: .5rem;
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
    background: ${(props) => (props.active ? "black" : "#CCC")};
    color: ${(props) => (props.active ? "#EEE" : "#555")};

    border-radius: 4px;
    line-height: 2px;
    min-width: 50px;
    height: 30px;
    padding: 0 .35rem; 
    margin-bottom: .5rem;
    margin-right: .5rem;
    align-items:center;
    display: flex;
    justify-content: center;
    cursor: pointer;

    &:hover{
      background: #BBB;
    }
`;

function Variant({ variant, variant_option = {}, onChange }) {

  const handleChange = (variant, option) => {
    onChange(variant, option);
  };

  return (
    <VariantContainer>
      <VariantTitle>{variant.name} {variant.required ? "(Required)" : ""}</VariantTitle>
      <VariantDescription>{variant.description}</VariantDescription>
      <VariantOptions>
        {variant?.name?.toLocaleLowerCase() === "color"
          ? variant.options.map((option) => {
            let is_active = variant_option[variant.name] && Object.keys(variant_option[variant.name]).includes(option.name);
            return (
              <ColorCircle
                color={option.name}
                active={is_active}
                key={option.id || option.key || Math.random()}
                onClick={() => {
                  if (!is_active) handleChange(variant, option);
                }}
              />
            );
            })
          : variant.options.map((option) => {
            let is_active = variant_option[variant.name] && Object.keys(variant_option[variant.name]).includes(option.name)
              return (
                <Pill
                  key={option.id || option.key || Math.random()}
                  active={is_active}
                  onClick={() => {
                    if (!is_active) handleChange(variant, option);
                  }}
                >
                  {option.name}
                </Pill>
              );
            })}
      </VariantOptions>
    </VariantContainer>
  );
}
export default Variant;
