import React from "react";
import styledComponents from "styled-components";
import DesignedButton from "../components/common/DesignedButton";
import DesignedTitle from "../components/common/DesignedTitle";
import Main from "../components/layout/Main";
import SectionContainer from "../components/sections/SectionContainer";
import { loginUser, registerUser, useGenukaDispatch, useGenukaState } from "../store/genukaStore";
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
function RegisterPage({ company }) {
  const [user, setUser] = React.useState();
  const dispatch = useGenukaDispatch();
  const { isLogged } = useGenukaState();
  React.useEffect(() => {
    if (isLogged) {
      Router.push("/account");
    }
  }, [isLogged]);

  return (
    <Main
      company={company}
      head={
        <>
          <title>{company.name} | Create Account</title>
            <link rel="favicon" href={company.logo} />
            <link rel="icon" href={company.logo} />
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
          <DesignedTitle style={{ marginBottom: "2rem", textAlign: "left" }}>Register</DesignedTitle>
          <Input
            type="text"
            placeholder="Your first name "
            onChange={(e) => {
              setUser({ ...user, first_name: e.target.value });
            }}
          />{" "}
          <Input
            type="text"
            placeholder="Your last name "
            onChange={(e) => {
              setUser({ ...user, last_name: e.target.value });
            }}
          />{" "}
          <Input
            type="email"
            placeholder="Your email "
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <Input
            type="tel"
            placeholder="Your phone number (with area code +237...) "
            onChange={(e) => {
              setUser({ ...user, tel: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Your password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <DesignedButton
            style={{ marginTop: "1rem" }}
            full
            onClick={() => {
              registerUser(dispatch, company.id, user);
            }}
          >
            Register
          </DesignedButton>
          <hr />
          <div>
            {" Already have an account ? "}
            <Link href="/login" passHref>
              <span style={{ color: "var(--secondary-color)" }}>Login</span>
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

export default RegisterPage;
