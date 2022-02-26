/* eslint-disable @next/next/no-img-element */
import React from "react";
// import Image from "next/image";
import Menu from "../common/Menu";
import CurrencySelector from "../common/CurrencySelector";
import AccountHeader from "../common/AccountHeader";
import CartHeader from "../common/CartHeader";
import styledComponents from "styled-components";
import SideBar from "./SideBar";

const Logo = styledComponents.img`
    height: 80px;
    border-radius: 100%;
`;

function Header({ company }) {
  return (
    <div className="container my-3 d-flex justify-content-between align-items-center">
      <div className="d-flex d-lg-none">
         <SideBar />
      </div>
      <div className="d-flex">
        <Logo src={company.logo} alt={"Logo de " + company.name} className="d-none d-lg-block" />
        <Logo style={{ height: "50px" }} src={company.logo} alt={"Logo de " + company.name} className="d-block d-lg-none" />
        <Menu className="d-none d-lg-flex" />
      </div>
      <div className="d-flex">
        <CurrencySelector className="d-none d-lg-flex" />
        <AccountHeader />
        <CartHeader />
      </div>
    </div>
  );
}

export default Header;
