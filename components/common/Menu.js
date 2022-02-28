import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import styledComponents from "styled-components";

const Container = styledComponents.div`
    display: flex;
    align-items:center;
`;
const Ul = styledComponents.ul`
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: ${(props) => (props.isMobile ? "flex-start" : "center")};
    flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
    margin-left:${(props) => (props.isMobile ? "0" : "1rem")};

    li {

        margin:  ${(props) => (props.isMobile ? ".5rem 0" : "0 1rem")};
    }
`;
const Li = styledComponents.li`
    margin: 0;
    padding: 0;
    list-style-type: none;
    margin: 0 1rem;
    font-size: 1.2rem;
    font-weight: 300;
    padding: .2rem;
    
    &.active{
        color: var(--primary-color);
        font-weight: 500;
    }

    a:hover{
        color: var(--secondary-color);
    }
`;
function Menu(props) {
  const { isMobile = false } = props;
  const router = useRouter();
  return (
    <Container {...props}>
      <Ul isMobile={isMobile}>
        <Li className={router.pathname == "/" ? "active" : ""}>
          <Link href="/">Home</Link>
        </Li>
        <Li className={router.pathname == "/about-us" ? "active" : ""}>
          <Link href="/about-us">About</Link>
        </Li>
        <Li className={router.pathname == "/collections" ? "active" : ""}>
          <Link href="/collections">Collections</Link>
        </Li>
        <Li className={router.pathname == "/collections/[collection_id]" || router.pathname == "/products/[product_id]" ? "active" : ""}>
          <Link href="/collections/all">Catalog</Link>
        </Li>
        <Li className={router.pathname == "/blogs/*" ? "active" : ""}>
          <Link href="/blogs">Blogs</Link>
        </Li>
        <Li className={router.pathname == "/contact" ? "active" : ""}>
          <Link href="/contact">Contact</Link>
        </Li>
      </Ul>
    </Container>
  );
}

export default Menu;
