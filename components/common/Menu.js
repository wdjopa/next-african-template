import Link from "next/link";
import React from "react";

import styledComponents from "styled-components";

const Container = styledComponents.div`
    display: flex;
    align-items:center;

`;
const Ul = styledComponents.ul`
    margin: 0;
    padding: 0;
    margin-left: 1rem;
    display: flex;
    align-items:center;
    justify-content: flex-start;
`;
const Li = styledComponents.li`
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding: .2rem;
    margin: 0 1rem;
    font-size: 1.2rem;
    font-weight: 300;
    
    &.active{
        color: var(--primary-color);
        font-weight: 500;
    }

    a:hover{
        color: var(--secondary-color);
    }
`;
function Menu(props) {
  return (
    <Container {...props}>
      <Ul>
        <Li className="active">
          <Link href="/">Home</Link>
        </Li>
        <Li>
          <Link href="/about-us">About</Link>
        </Li>
        <Li>
          <Link href="/collections">Collections</Link>
        </Li>
        <Li>
          <Link href="/collections/all">Catalog</Link>
        </Li>
        <Li>
          <Link href="/blogs">Blogs</Link>
        </Li>
        <Li>
          <Link href="/contact">Contact</Link>
        </Li>
      </Ul>
    </Container>
  );
}

export default Menu;
