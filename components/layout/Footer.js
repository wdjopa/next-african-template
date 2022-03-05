/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import styledComponents from "styled-components";
import SocialIcons from "../common/SocialIcons";
import Divider from "../common/Divider";
import Link from "next/link";

const Title = styledComponents.h3`
  font-family: var(--main-font) !important;
  font-size: 2rem;
  margin-top: 1rem;
`;
const CompanyName = styledComponents(Title)`
  text-transform: uppercase;
`;
const CompanyDescription = styledComponents.div`
  margin-bottom: 1rem;
  font-size: 14px;
`;

const Ul = styledComponents.ul`
    margin: 0;
    padding: 0;
    margin-left: 0;
    display: flex;
    align-items:flex-start;
    flex-direction: column;
    justify-content: flex-start;
`;
const Li = styledComponents.li`
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding: .2rem;
    margin: 0;
    font-size: 1rem;
    font-weight: 200!important;
    font-family: "Open Sans", sans-serif;
    
    a:hover{
        color: var(--secondary-color);
    }
`;

const CopyrightText = styledComponents.div``;

const ImagePayment = styledComponents.img`
    height: 30px;
    margin-left: 15px
`;

const PaymentIcons = React.memo(({ company }) => {
  if (company && company.payment_modes) {
    let payments = [];
    Object.keys(company.payment_modes).forEach((payment_mode) => {
      let payment = company.payment_modes[payment_mode];
      if (payment_mode === "mobilemoney") {
        payments.push({
          payment,
          slug: "orangemoney",
        });
        payments.push({
          payment,
          slug: "mtnmomo",
        });
      } else if (payment_mode === "card") {
        payments.push({
          payment,
          slug: "visa",
        });
        payments.push({
          payment,
          slug: "mastercard",
        });
        payments.push({
          payment,
          slug: "amex",
        });
      } else {
        payments.push({
          payment,
          slug: payment_mode,
        });
      }
    });
    return (
      <div className="d-flex justify-content-end ">
        {payments.map((payment_mode) => {
          return <ImagePayment key={payment_mode.slug} src={"/icons/" + payment_mode.slug + ".png"} alt={"Icone de " + payment_mode.payment.full_name} />;
        })}
      </div>
    );
  } else {
    return <></>;
  }
});

export function Copyright({ company }) {
  return (
    <div className="row py-4">
      <div className="col-md-8 mt-3">
        <CopyrightText>
          All rights reserved {company && company.name} 2022. Ecommerce propulsed by <a href="https://genuka.com/?ref=matanga">Genuka</a>
        </CopyrightText>
      </div>
      {company && (
        <div className="col-md-4 mt-3">
          <PaymentIcons company={company} />
        </div>
      )}
    </div>
  );
}

const Footer = React.memo(({ company }) => {
  return (
    <div className={"container"}>
      <div className={"row"}>
        <div className=" col-md-4">
          <CompanyName>{company.name}</CompanyName>
          <CompanyDescription>{company.description}</CompanyDescription>
          <Image src={company.logo} alt={"Logo de " + company.name} width={100} height={100} />
        </div>
        <div className="   col-md-4">
          <Title className="main-font">Links</Title>
          <Ul>
            <Li>
              <Link passHref href="/">
                Home
              </Link>
            </Li>
            <Li>
              <Link passHref href="/collections">
                Collections
              </Link>
            </Li>
            <Li>
              <Link passHref href="/catalog">
                Products
              </Link>
            </Li>
            {/* <Li>
              <Link passHref href="/blogs">
                Blog
              </Link>
            </Li> */}
            {/* <Li>
              <Link passHref href="/contact">
                Contact
              </Link>
            </Li>
            <Li>
              <Link passHref href="/faq">
                FAQ
              </Link>
            </Li> */}
          </Ul>
        </div>
        <div className="   col-md-4">
          <Title className="main-font">Mentions légales</Title>
          <Ul>
            <Li>
              <Link passHref href="/legals/politique-de-remboursement">
                Politique de remboursement
              </Link>
            </Li>
            <Li>
              <Link passHref href="/legals/politique-de-remboursement">
                Politique de livraison
              </Link>
            </Li>
            <Li>
              <Link passHref href="/legals/politique-de-remboursement">
                Conditions générales d'utilisation
              </Link>
            </Li>
            <Li>
              <Link passHref href="/legals/politique-de-remboursement">
                Déclaration de confidentialité
              </Link>
            </Li>
            <Li>
              <Link passHref href="/legals/politique-de-remboursement">
                Mentions légales
              </Link>
            </Li>
          </Ul>
        </div>
      </div>
      <SocialIcons social_networks={[]} />
      <Divider />
      <Copyright company={company} />
    </div>
  );
});

export default Footer;
