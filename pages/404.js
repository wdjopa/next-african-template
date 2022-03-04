import React from "react";
import EmptyStore from "../components/EmptyStore";
import Main from "../components/layout/Main";
import styledComponents from "styled-components";
import SectionContainer from "../components/sections/SectionContainer";
import DesignedTitle from "../components/common/DesignedTitle";

const Center = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15rem 0;
`;


export async function getServerSideProps(context) {
  let company, company_url;
  const { req, query, res, asPath, pathname } = context;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  return {
    props: {
      company,
    },
  };
}
function Custom404({ company }) {
 
  if (!company) return <EmptyStore />;
  return (
    // <Main company={company}>
      <SectionContainer>
        <Center>
          <DesignedTitle>
          404 - Page not found
          </DesignedTitle>
        </Center>
      </SectionContainer>
    // </Main>
  );
}

export default Custom404;
