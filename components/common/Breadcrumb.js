import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import Chevron from "../icons/Chevron";

const Container = styledComponents.div`
    margin: 1rem 0;
    display: flex;
    align-items: center;
`;

const ItemContainer = styledComponents.div`
    color: ${(props) => (props.active ? "black" : "#AAA")};
    font-family: "Open Sans";
    font-size: 14px;
    -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;
`;

const ChevronStyled = styledComponents(Chevron)`
    margin-left: 10px;
    margin-right: 10px;
    padding: 0;
`;


function Item({ item, lastItem }) {
  return (
    <ItemContainer active={item.active}>
      {item.active && (
        <Link href={item.link} passHref>
          {item.label}
        </Link>
      )}
      {!item.active && item.label}
      {!lastItem && <ChevronStyled color={item.active ? "black" : "#AAA"} />}
    </ItemContainer>
  );
}


function Breadcrumb(props) {
  const { items } = props;
  return <Container {...props}>
      {items.map((item, i) => {
          return <Item key={"item-"+i} item={item} lastItem={i === items.length-1}/>
      })}
  </Container>;
}

export default Breadcrumb;
