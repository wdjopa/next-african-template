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
import { useGenukaDispatch, useGenukaState, placeOrder } from "../../store/genukaStore";
import { useRouter } from "next/router";

const SecondaryTitle = styledComponents.h3`
    font-family: "Open Sans";
    font-size: 1.5rem;
    margin-top: 1rem;
`;

const ImagePayment = styledComponents.img`
    height: 50px;
    object-fit: contain;
    margin-left: 5px;
      border: 2px solid transparent;
      transition: all .2s ease;
`;
const PaymentModeItem = styledComponents.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  padding: 0rem 2rem;
  padding-left: 0rem;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `
    span{
      color: var(--secondary-color);
    }
    img{
      // box-shadow: 0px 0px 1px 1px var(--secondary-color);
      border-radius: 5px;
      border: 2px solid var(--secondary-color);
    }
  `
      : ""}
`;

const PageContent = styledComponents.div`
    & {
      font-family: "Open Sans";
    }
`;

function CheckoutPagePayment({ company }) {
  const { current_order, cart, loading } = useGenukaState();
  const dispatch = useGenukaDispatch();

  const router = useRouter();

  React.useEffect(() => {
    if (current_order) {
      router.push("/orders/" + current_order.reference.replace("#", "") + "/payment");
    }
    if (!current_order && cart.items.length === 0) {
      router.push("/cart");
    }
  }, [current_order]);
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
    // {
    //   label: "Shipping",
    //   active: true,
    //   link: "/checkout/shipping",
    // },
    {
      label: "Payment",
      active: true,
      link: "/checkout/payment",
    },
  ];
  let payments = [];

  if (company && company.payment_modes) {
    Object.keys(company.payment_modes)
      .filter((payment_mode) => company.payment_modes[payment_mode].accept)
      .forEach((payment_mode) => {
        let payment = company.payment_modes[payment_mode];
        if (payment_mode === "mobilemoney") {
          payments.push({
            payment,
            slug: "mobilemoney",
          });
        } else if (payment_mode === "card") {
          payments.push({
            payment,
            slug: "card",
          });
        } else {
          payments.push({
            payment,
            slug: payment_mode,
          });
        }
      });
  }

  return (
    <Main company={company}>
      <SectionContainer>
        <DesignedTitle>Checkout</DesignedTitle>
        <Breadcrumb items={items} />
        <PageContent className="row ">
          <div className="col-md-7">
            <div className="row ">
              <div className="col-md-12">
                <SecondaryTitle>Payment mode</SecondaryTitle>
              </div>
              <div className="col-md-12 mt-5">
                <h5>Select a payment mode</h5>
                {payments && (
                  <div className="d-flex flex-column justify-content-start align-items-start my-5 ">
                    {payments.map((payment_mode) => {
                      return (
                        <PaymentModeItem
                          key={payment_mode.slug}
                          active={payment_mode.slug === cart.payment_mode?.slug}
                          onClick={() => {
                            dispatch({ type: "cart", payload: { ...cart, payment_mode } });
                          }}
                        >
                          <ImagePayment src={"/icons/" + payment_mode.slug + ".png"} alt={"Icone de " + payment_mode.payment.full_name} />
                          <span style={{ marginLeft: "15px" }}>{payment_mode.payment.full_name}</span>
                        </PaymentModeItem>
                      );
                    })}
                  </div>
                )}{" "}
              </div>
              <div className="col-md-12 mt-2 mb-5">
                <DesignedButton
                  full
                  onClick={() => {
                    if (cart.payment_mode) {
                      placeOrder(dispatch, cart, company);
                    }
                  }}
                  isLoading={loading?.order}
                >
                  Place my order
                </DesignedButton>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <OrderRecap />
          </div>
        </PageContent>
      </SectionContainer>
    </Main>
  );
}

export async function getServerSideProps(context) {
  let company, company_url;
  const { req } = context;

  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  return {
    props: {
      company,
    },
  };
}

export default CheckoutPagePayment;
