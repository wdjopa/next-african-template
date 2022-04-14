import React from "react";
import styledComponents from "styled-components";
import DesignedButton from "../../../components/common/DesignedButton";
import DesignedTitle from "../../../components/common/DesignedTitle";
import Main from "../../../components/layout/Main";
import SectionContainer from "../../../components/sections/SectionContainer";

const SecondaryTitle = styledComponents.h3`
    font-family: "Open Sans";
    font-size: 1.5rem;
    margin-top: 1rem;
`;

const ImagePayment = styledComponents.img`
    height: 50px!important;
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

function PayAnOrder({ company, order }) {
  const [_order, set_order] = React.useState(order);
  const [payments, set_payments] = React.useState([]);

  React.useEffect(() => {
    if (company && company.payment_modes) {
      set_payments(
        Object.keys(company.payment_modes)
          .filter((payment_mode) => payment_mode !== "cash")
          .filter((payment_mode) => company.payment_modes[payment_mode].accept)
          .map((payment_mode) => {
            let payment = company.payment_modes[payment_mode];
            if (_order.payment_mode === payment_mode) {
              set_order({ ..._order, payment });
            }
            return {
              payment,
              slug: payment_mode,
            };
          })
      );
    }
  }, []);

  return (
    <Main company={company}>
      <SectionContainer>
        <div style={{ textAlign: "center", margin: "3rem 0", marginBottom: "5rem" }}>
          <DesignedTitle>Pay order {order?.reference}</DesignedTitle>
        </div>
        {payments.length > 0 ? (
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
                        active={payment_mode.slug === _order.payment_mode}
                        onClick={() => {
                          set_order({ ..._order, payment_mode: payment_mode.slug, payment: payment_mode.payment });
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
            <div className="col-md-12 mt-2 mb-5" style={{ textAlign: "center" }}>
              <DesignedButton onClick={() => {}}>Pay with {_order?.payment?.full_name}</DesignedButton>
            </div>
          </div>
        ) : (
          <div className="row ">
            <div className="col-md-12" style={{textAlign:"center"}}>
              <SecondaryTitle>No payment method available. </SecondaryTitle>
              To pay your order, contact us by phone : {company.phone} or email {company.email}
            </div>
          </div>
        )}
      </SectionContainer>
    </Main>
  );
}

export async function getServerSideProps(context) {
  let company, company_url;
  const { req, query } = context;
  const { order_reference } = query;
  const token = req.cookies.access_token;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  if (token) {
    result = await fetch(`https://api.genuka.com/2021-10/clients/orders/by_reference/${order_reference}`, { headers: { Authorization: "Bearer " + token } });
    let res = await result.json();
    return {
      props: {
        company,
        order: res.order,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
}

export default PayAnOrder;
