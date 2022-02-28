import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import CartIcon from "../icons/CartIcon";

const Container = styledComponents.div`
    ${(props) => (props.mobile ? "" : "margin-right: 1rem;")}
`;

const ActionIcon = styledComponents.div`
    cursor: pointer;
    padding: 5px 10px;
`;

function CartHeader(props) {
  const { mobile } = props;

  return (
    <Container mobile={mobile}>
      <Link href="/cart" passHref>
        <ActionIcon>
          <CartIcon size={"25"}  />
        </ActionIcon>
      </Link>
    </Container>
  );
}

export default CartHeader;
