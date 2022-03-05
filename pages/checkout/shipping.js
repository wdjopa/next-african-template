import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import Breadcrumb from "../../components/common/Breadcrumb";
import DesignedButton from "../../components/common/DesignedButton";
import DesignedTitle from "../../components/common/DesignedTitle";
import OrderRecap from "../../components/common/OrderRecap";
import EmptyStore from "../../components/EmptyStore";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";

const SecondaryTitle = styledComponents.h3`
    font-family: "Open Sans";
    font-size: 1.5rem;
    margin-top: 1rem;
`;


function CheckoutPageShippings({ company }) {
  const [createAccount, setCreateAccount] = React.useState(false);

  company = {
    name: "MATANGA Shoes",
    description: "Une marque de fabrication de chaussures aux motifs et designs africains",
    logo: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5605/logo_matanga.png",
  };
  if (!company) return <EmptyStore />;

  const items = [
    {
      label: "Cart",
      active: true,
      link: "/cart",
    },
    {
      label: "Informations",
      active: true,
      link: "/checkout",
    },
    {
      label: "Shipping",
      active: true,
      link: "/checkout/shipping",
    },
    {
      label: "Payment",
      active: false,
      link: "/checkout/payment",
    },
  ];

  return (
    <Main company={company}>
      <SectionContainer>
        <DesignedTitle>Checkout</DesignedTitle>
        <Breadcrumb items={items} />
        <div className="row ">
          <div className="col-md-7">
            <div className="row ">
              <div className="col-md-12">
                <SecondaryTitle>Shipping mode</SecondaryTitle>
              </div>
              <div className="col-md-12">
                
              </div>
              <div className="col-md-12 mt-2">
                <Link href="/checkout/payment" passHref>
                  <DesignedButton full>Continue to payment</DesignedButton>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <OrderRecap />
          </div>
        </div>
      </SectionContainer>
    </Main>
  );
}

export default CheckoutPageShippings;
