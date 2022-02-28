import React from "react";
import styledComponents from "styled-components";
import Minus from "../icons/Minus";
import Plus from "../icons/Plus";

const ActionContainer = styledComponents.div`
  width: auto;
  margin-bottom: 1rem;
`;
const ActionButton = styledComponents.span`
  width: 40px;
  text-align:center;
  cursor: pointer;
  display: inline-block;
  font-size: 3rem;
  font-weight: 200;
`;
const Value = styledComponents.span`
  font-size: 1.52rem;
  display: inline-block;
min-width: 80px;
  height: 100%;
  text-align:center;
`;

const ProductQuantityContainer = styledComponents.div`
  -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;
`;
const ProductQuantityTitle = styledComponents.h5`
`;

function QuantitySelector({ withText = true, quantity = 1, setQuantity }) {
  return (
    <ProductQuantityContainer>
      {withText && <ProductQuantityTitle>Quantity</ProductQuantityTitle>}
      <ActionContainer>
        <ActionButton
          onClick={() => {
            setQuantity(quantity - 1 < 0 ? 1 : quantity - 1);
          }}
        >
          <Minus />
        </ActionButton>
        <Value>{quantity}</Value>
        <ActionButton
          onClick={() => {
            setQuantity(quantity + 1 > 99 ? 99 : quantity + 1);
          }}
        >
          <Plus />
        </ActionButton>
      </ActionContainer>
    </ProductQuantityContainer>
  );
}

export default QuantitySelector;
