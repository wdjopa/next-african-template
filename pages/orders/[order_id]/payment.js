import React from "react";
import DesignedTitle from "../../../components/common/DesignedTitle";
import Main from "../../../components/layout/Main";
import SectionContainer from "../../../components/sections/SectionContainer";
import { getCookie } from "../../../utils/cookies";

function PayAnOrder({ company, order }) {
  return (
    <Main company={company}>
      <SectionContainer>
        <div style={{ textAlign: "center", margin: "5rem 0" , marginBottom: "10rem" }}>
          <DesignedTitle>Proceed to checkout for order {order?.reference}</DesignedTitle>
        </div>
      </SectionContainer>
    </Main>
  );
}

export async function getServerSideProps(context) {
  let company, company_url;
  const { req, query } = context;
  const { order_id } = query;
  const token = req.cookies.access_token;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  if (token) {
    result = await fetch(`https://api.genuka.com/2021-10/clients/orders/${order_id}`, { headers: { Authorization: "Bearer " + token } });
    let res = await result.json();
    console.log(res);
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
