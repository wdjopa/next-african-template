import React from "react";
import styledComponents from "styled-components";

const Container = styledComponents.div`
    margin: 0 1rem;
    display: flex;
`;
const CustomSelect = styledComponents.select`
    border: none;
    padding:5px;
`;

function CurrencySelector(props) {
  return (
    <Container {...props}>
      <CustomSelect>
        <option>XAF FCFA</option>
        <option>EUR €</option>
      </CustomSelect>
    </Container>
  );
}

export default CurrencySelector;
