import React from "react";
import styledComponents from "styled-components";
import CartIcon from "../icons/CartIcon";

const Container = styledComponents.div`
    margin-right: 1rem;
`;

const ActionIcon = styledComponents.div`
    cursor: pointer;
    padding: 5px 10px;
`;

function CartHeader() {
  return (
    <Container>
      <ActionIcon>
        <CartIcon />
      </ActionIcon>
    </Container>
  );
}

export default CartHeader;
