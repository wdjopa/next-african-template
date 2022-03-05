import React from "react";
import styledComponents from "styled-components";
import Main from "../../components/layout/Main";
import Link from "next/link";
import SectionContainer from "../../components/sections/SectionContainer";
import { useRouter } from "next/router";
import { getCookie } from "../../utils/cookies";
import Divider from "../../components/common/Divider";

const LeftMenu = styledComponents.div`
    border: 1px solid #AAA;
    border-radius: 5px;
`;

const Item = styledComponents.div`
    padding: 1rem;
    border-bottom: 1px solid #AAA;
    cursor: pointer;

    &:hover{
        font-weight: 600;
    }

    ${(props) =>
      props.active
        ? `
    background: var(--primary-color);
    color: white;
    `
        : ""}
`;

function AccountHome({ company, children }) {
  const router = useRouter();
  return (
    <Main company={company}>
      <SectionContainer>
        <div className="row">
          <div className="col-md-3 mb-5">
            <LeftMenu>
              <Link passHref href="/account/orders">
                <Item active={router.pathname == "/account/orders" || router.pathname == "/account/orders/*"}>🧰 Orders</Item>
              </Link>
              <Link passHref href="/account/addresses">
                <Item active={router.pathname == "/account/addresses" || router.pathname == "/account/addresses/*"}>🏠 Addresses</Item>
              </Link>
              <Link passHref href="/account">
                <Item active={router.pathname == "/account"}>🛠 Informations</Item>
              </Link>
              <Link passHref href="/logout">
                <Item active={router.pathname == "/logout"}>✖ Logout</Item>
              </Link>
            </LeftMenu>
          </div>
          {children && <div className="col-md-9 mb-5">{children}</div>}
          {!children && (
            <div className="col-md-9 mb-5">
              <h2>Informations</h2>
              <Divider/>
            </div>
          )}
        </div>
      </SectionContainer>
    </Main>
  );
}

export async function getServerSideProps(context) {
  let company, company_url;
  const { req } = context;
  const token = req.cookies.access_token;
  if (!token || token === "")
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };

  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  return {
    props: {
      company,
    },
  };
}

export default AccountHome;
