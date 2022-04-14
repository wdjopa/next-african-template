import React from "react";
import styledComponents from "styled-components";
import DesignedButton from "../components/common/DesignedButton";
import DesignedTitle from "../components/common/DesignedTitle";
import Main from "../components/layout/Main";
import SectionContainer from "../components/sections/SectionContainer";
import { loginUser, useGenukaDispatch, useGenukaState } from "../store/genukaStore";
import Router from "next/router";
import Link from "next/link";

const Input = styledComponents.input`
    font-family: "Open Sans";
    width: 100%;
    margin: 10px 0;
    padding: 10px 20px;
    border: 1px solid #CCC;
    border-radius: 4px;

`;
const Center = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
    flex-direction: column;
    width: 50%;

    @media (max-width: 600px) {
        & {
            width: 90%;
        }
    }
`;
function LoginPage({ company }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const dispatch = useGenukaDispatch();
  const { user } = useGenukaState();
  React.useEffect(() => {
    if (user) {
      Router.push("/account");
    }
  }, [user]);
  return (
    <Main
      company={company}
      head={
        <>
          <title>{company.name} | Login</title>
          <meta name="description" content={company.description} />
          <meta name="keywords" content={company?.description?.split(" ").join(", ")} />
          <meta name="author" content={company.name} />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content={company.name} />
          <meta name="msapplication-TileColor" content="#222" />
          <meta name="msapplication-TileImage" content={company.logo} />
          <meta name="theme-color" content="#222" />
          <meta property="og:title" content={company.name} />
          <meta property="og:description" content={company.description} />
          <meta property="og:image" content={company.logo} />
          <meta property="og:url" content={company.website} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={company.name} />
        </>
      }
    >
      <SectionContainer>
        <Center>
          <DesignedTitle style={{ marginBottom: "2rem", textAlign: "left" }}>Login</DesignedTitle>
          <Input
            type="text"
            placeholder="Your email or phone number (with area code +237...)"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <DesignedButton
            style={{ marginTop: "1rem" }}
            full
            onClick={() => {
              loginUser(dispatch, company.id, { email, password });
            }}
          >
            Login
          </DesignedButton>
          <hr />
          <div>
            {" Don't have an account ? "}
            <Link href="/register" passHref>
              <span style={{ color: "var(--secondary-color)" }}>Register</span>
            </Link>
          </div>
        </Center>
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
 if (!company || !company.template) {
   return {
     redirect: {
       permanent: false,
       destination: "/404",
     },
     props: {},
   };
 }
  return {
    props: {
      company,
    },
  };
}

export default LoginPage;
