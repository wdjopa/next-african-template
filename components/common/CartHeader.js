import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import { useGenukaState } from "../../store/genukaStore";
import CartIcon from "../icons/CartIcon";

const Container = styledComponents.div`
    ${(props) => (props.mobile ? "" : "margin-right: 1rem;")}
`;

const ActionIcon = styledComponents.div`
    cursor: pointer;
    padding: 5px 10px;
    position: relative;
`;

const Counter = styledComponents.span`
  background: var(--primary-color);
  color: white;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  padding-top: 3px;
`;

function CartHeader(props) {
  const { mobile } = props;
  const { cart } = useGenukaState();
  return (
    <Container mobile={mobile}>
      <Link href="/cart" passHref>
        <ActionIcon>
          <CartIcon size={"25"} />
          {cart.items.length > 0 && <Counter>{cart.items.reduce((prev, current) => {
            return current.quantity + prev
          }, 0 )}</Counter>}
        </ActionIcon>
      </Link>
    </Container>
  );
}

export default CartHeader;
