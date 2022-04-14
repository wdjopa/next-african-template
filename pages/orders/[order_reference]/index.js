import Link from "next/link";
import React from "react";
import NumberFormat from "react-number-format";
import DesignedTitle from "../../../components/common/DesignedTitle";
import Divider from "../../../components/common/Divider";
import Main from "../../../components/layout/Main";
import SectionContainer from "../../../components/sections/SectionContainer";

function OrderDetail({ company, order }) {
  return (
    <Main company={company}>
      <SectionContainer>
        <div style={{ textAlign: "center", margin: "2rem 0", marginBottom: "10rem" }}>
          <DesignedTitle>Order {order?.reference}</DesignedTitle>
        </div>
        <div>
          <div className="row">
            <div className="col-md-12">
              <h5>Payment</h5>
              <Divider clasName="" />
              <div className="mt-2">
                <p>
                  <strong>Status</strong> : {order.payment_state ? "Paid" : "Not paid"}
                </p>
                <p>
                  <strong>Amount</strong> :
                  <NumberFormat thousandsGroupStyle="thousand" value={order.total} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
                </p>
                <p>
                  <strong>Payment method</strong> : {order.payment_mode}
                </p>
                <p style={{ textAlign: "right" }}>
                  {!order.payment_state && order.payment_mode !== "cash" ? (
                    <Link href="/orders/[order_reference]/payment" as={`/orders/${order.reference.replace("#", "")}/payment`}>
                      <a className="btn btn-primary">Pay now 💳</a>
                    </Link>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>

            <div className="col-md-12 mt-5">
              <h5>Shipping & Addresses</h5>
              <Divider clasName="" />
              <div className="mt-2">
                <p>
                  <strong>Status</strong> : {order.shipping_state ? "Shipped" : "Not shipped"}
                </p>
                <p>
                  <strong>Addresses</strong> :
                  <div>
                    {order.addresses.map((address) => (
                      <div key={address.id}>
                        <p>
                          {address.label} ({address.is_shipping ? "Shipping" : "Billing"} address)
                        </p>
                        <p>
                          {address.given_name} {address.family_name}
                          {address.attributes.tel}
                        </p>
                        <p>{address.address}</p>
                        <p>{address.city}</p>
                        <p>{address.postal_code}</p>
                        <p>{address.country}</p>
                      </div>
                    ))}
                  </div>
                </p>
              </div>
            </div>

            <div className="col-md-12 mt-5">
              <h5>Products</h5>
              <Divider clasName="" />
              <div className="mt-2">
                {order?.products.map((item) => (
                  <div key={item.id} className="row mt-2">
                    <Link href={`/products/${item.slug}`} passHref>
                      <div className="col-12">
                        {item.pivot.quantite} x <NumberFormat thousandsGroupStyle="thousand" value={item.pivot.prix} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
                        {" - "}
                        <a>{item.name}</a>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-12 mt-5">
              <h5>Total</h5>
              <Divider clasName="" />
              <div className="mt-2">
                <p>
                  <strong>Subtotal</strong> : <NumberFormat thousandsGroupStyle="thousand" value={order.subtotal} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
                </p>
                <p>
                  <strong>Shipping</strong> : {order.livraison ? <NumberFormat thousandsGroupStyle="thousand" value={order.livraison} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} /> : "Not defined"}
                </p>

                <p>
                  <strong>Total</strong> : <NumberFormat thousandsGroupStyle="thousand" value={order.total} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="mt-4">
          Need help?{" "}
          <Link href="/contact">
            <a>Contact us</a>
          </Link>
        </div>
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

export default OrderDetail;
