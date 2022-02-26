import React from "react";
import Image from "next/image";

// import styled from "styled-components";

// const Title = styled.h3`
//   font-family: var(--main-font) !important;
//   font-size: 2rem;
// `;
// const CompanyName = styled(Title)`
//   text-transform: uppercase;
// `;
// const CompanyDescription = styled.div`
//   margin-bottom: 1rem;
//   font-size: 14px;
// `;

function Footer({ company }) {
  return (
    <div className={"container"}>
      <div className={"row"}>
        <div className=" col-md-4">
          <h3 className="main-font text-2xl uppercase ">{company.name}</h3>
          <div className="my-2">{company.description}</div>
          <Image src={company.logo} alt={"Logo de " + company.name} width={100} height={100} />
        </div>
        <div className="   col-md-4">
          <h3 className="main-font text-2xl">Links</h3>
          <ul className="">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </div>
        <div className="   col-md-4">
          <h3 className="main-font text-2xl">Mentions légales</h3>
          <ul>
            <li>Politique de livraison</li>
            <li>Politique de livraison</li>
            <li>Politique de livraison</li>
            <li>Politique de livraison</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
