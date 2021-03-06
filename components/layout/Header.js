/* eslint-disable @next/next/no-img-element */
import React from "react";
// import Image from "next/image";
import Menu from "../common/Menu";
import CurrencySelector from "../common/CurrencySelector";
import AccountHeader from "../common/AccountHeader";
import CartHeader from "../common/CartHeader";
import styledComponents from "styled-components";
import SideBar from "./SideBar";
import Link from "next/link";

const Logo = styledComponents.img`
    height: 80px;
    min-width: 50px;
    border-radius: 100%;
`;

const HeaderContainer = styledComponents.div`
    position: sticky;
    top: 0;
    background: white;
    padding-bottom: calc(10px + 1vw);
    padding-top: calc(10px + 1vw);
    z-index: 500;
`;

function Header(props) {
  const { company } = props;
  return (
    <HeaderContainer className="container d-flex justify-content-between align-items-center" {...props}>
      <div className="d-flex d-lg-none" style={{ width: "30%" }}>
        <SideBar company={company} />
      </div>
      <div className="d-flex">
        <Link href="/" passHref>
          {/* Mobile */}
          <Logo style={{ height: "50px" }} src={company.logo} alt={"Logo de " + company.name} className="d-block d-lg-none" />
        </Link>
        <Link href="/" passHref>
          {/* Large screens */}
          <Logo src={company.logo} alt={"Logo de " + company.name} className="d-none d-lg-block" />
        </Link>
        <Menu className="d-none d-lg-flex" />
      </div>
      <div className="d-none d-lg-flex">
        <CurrencySelector />
        <AccountHeader />
        <CartHeader />
      </div>
      <div className="d-flex d-lg-none justify-content-end" style={{ width: "30%" }}>
        <AccountHeader mobile={true} />
        <CartHeader mobile={true} />
      </div>
    </HeaderContainer>
  );
}

export default Header;
