import Link from "next/link";
import NumberFormat from "react-number-format";
import styledComponents from "styled-components";
import AccountHome from ".";
import Divider from "../../components/common/Divider";
import EmptyList from "../../components/common/EmptyList";
import Pagination from "../../components/common/Pagination";
import * as dayjs from "dayjs";

const Pill = styledComponents.div`
  display: inline-block;
  background: ${(props) => (props.danger ? "#FF5555" : props.success ? "#0f870f" : "var(--secondary-color)")};
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  margin: 10px;
  margin-left: 0;

`;
const ContainerOrderCard = styledComponents.div`  
font-family: "Open sans";
  padding: 20px;
  box-shadow: 0 2px 5px #AAA;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  margin: 2%; 
  width: 45%;
  align-items: center;
  vertical-align: top;
  @media screen and (max-width: 600px) {
    & {
        width: 100%;
        margin: 0 10px; 
        margin-top: 1rem; 
        display: block;
        box-shadow: 0 2px 2px #AAA;
      }
  }
`;
const OrderCard = ({ order, company }) => {
  return (
    // <Link href={"/orders/" + order.id} passHref>
    <ContainerOrderCard>
      <h5>Order {order.reference}</h5>
      Created on {dayjs(order.created_at).format("MMMM D, YYYY h:mm A")}
      <br />
      {order.shipping_state === 0 && (
        <Pill danger title="Your order has not been shipped yet">
          🚚 Not shipped
        </Pill>
      )}
      {order.shipping_state === 1 && (
        <Pill success title="Your order has been shipped">
          🚚 Shipped
        </Pill>
      )}
      {order.payment_state === 0 && (
        <Link passHref href={`/orders/${order.reference.replace("#", "")}/payment`}>
          <Pill danger title="Click here to process payment">
            💳 Not paid
          </Pill>
        </Link>
      )}
      {order.payment_state === 1 && (
        <Pill success title="You have paid this order">
          💳 Paid
        </Pill>
      )}
      <Divider />
      <strong>Items</strong>
      <br />
      <ul>
        {order.products.map((product) => {
          return (
            <li key={product.id + order.id} style={{ listStyleType: "none" }}>
              <Link href={"/products/" + product.slug} passHref>
                <>
                  {product.pivot.quantite} &times; {product.name} ({product.pivot.prix} {company.currency.symbol})
                </>
              </Link>
              {/* {JSON.stringify(product)} */}
            </li>
          );
        })}
      </ul>
      <Divider />
      <strong>Address</strong>
      {order.addresses.map((address) => {
        return (
          <>
            <br />
            {address.label}
            <br />
            {address.given_name} {address.family_name}
            {" / "}
            {address.attributes?.tel}
            <br />
            {address.street} {address.city}
            <br />
            {address.postal_code} {address.country}
          </>
        );
      })}
      <br />
      <br />
      <Divider />
      <strong>Total</strong>
      <br />
      <div style={{ textAlign: "right" }}>
        <NumberFormat thousandsGroupStyle="thousand" value={order.total} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
      </div>
    </ContainerOrderCard>
    // </Link>
  );
};

function AccountOrders({ company, orders }) {
  return (
    <AccountHome company={company}>
      <h2>Orders</h2>
      <Divider />
      {orders.data.length === 0 ? (
        <EmptyList>No order here</EmptyList>
      ) : (
        <>
          {orders.data.map((order) => {
            return <OrderCard key={order.id || Math.random()} order={order} company={company} />;
          })}
          <Divider />
          <Pagination pagination={{ ...orders.links, ...orders.meta }} />
        </>
      )}
    </AccountHome>
  );
}

export async function getServerSideProps(context) {
  let company, company_url, orders;
  const { req, query } = context;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();
  const token = req.cookies.access_token;
  if (!token || token === "")
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  try {
    const { per_page = 10, page = 1 } = query;
    result = await fetch(`https://api.genuka.com/2021-10/clients/orders?per_page=${per_page}&page=${page}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    orders = await result.json();
  } catch (error) {
    console.error(error, error.response);
    orders = [];
  }
  return {
    props: {
      company,
      orders,
    },
  };
}

export default AccountOrders;
