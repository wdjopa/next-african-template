import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import Breadcrumb from "../../components/common/Breadcrumb";
import Checkbox from "../../components/common/Checkbox";
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

const StyledLink = styledComponents(Link)`
    margin: 1rem;
`;

const Text = styledComponents.div`
    text-align: right;
    font-family: "Open Sans";
    font-size: .81rem;
    a{
        color: var(--secondary-color) !important;
    }
`;

const Input = styledComponents.input`
    font-family: "Open Sans";
    width: 100%;
    margin: 10px 0;
    padding: 10px 20px;
    border: 1px solid #CCC;
    border-radius: 4px;

`;
function CheckoutPageInformations({ company }) {
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
      active: false,
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
                <SecondaryTitle>Coordonnées</SecondaryTitle>
                <Text>
                  Vous avez déjà un compte ?{" "}
                  <StyledLink href="/login" passHref>
                    connectez-vous
                  </StyledLink>
                  .
                </Text>
              </div>
              <div className="col-md-12">
                <div className="row ">
                  <div className="col-md-12">
                    <Input type="email" placeholder="Email or phone number (with area code)" />
                  </div>
                  {createAccount && (
                    <div className="col-md-12">
                      <Input type="password" placeholder="Your password" />
                    </div>
                  )}
                  <div className="col-md-12">
                    <Checkbox
                      label="Create an account"
                      onCheck={(value) => {
                        setCreateAccount(value);
                      }}
                      checked={createAccount}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12">
                <SecondaryTitle>Adresse de livraison</SecondaryTitle>
              </div>
              <div className="col-md-12">
                <div className="row ">
                  <div className="col-md-6">
                    <Input type="text" placeholder="First name" />
                  </div>
                  <div className="col-md-6">
                    <Input type="text" placeholder="Last name" />
                  </div>
                  <div className="col-md-12">
                    <Input type="tel" placeholder="Phone number" />
                  </div>
                  <div className="col-md-12">
                    <Input type="text" placeholder="Street" />
                  </div>
                  <div className="col-md-6">
                    <Input type="text" placeholder="City" />
                  </div>
                  <div className="col-md-6">
                    <Input type="text" placeholder="Country" />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-2">
                <Link href="/checkout/shipping" passHref>
                  <DesignedButton full>Continue to shipping</DesignedButton>
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

export default CheckoutPageInformations;
