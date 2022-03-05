import React from "react";
import DesignedButton from "../../../components/common/DesignedButton";
import DesignedTitle from "../../../components/common/DesignedTitle";
import Main from "../../../components/layout/Main";
import Link from "next/link";
import SectionContainer from "../../../components/sections/SectionContainer";
import styledComponents from "styled-components";
import { useGenukaState } from "../../../store/genukaStore";

const Center = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15rem 0;
    flex-direction: column;
`;
function ThankYouPage({ company }) {
  const { user, current_order } = useGenukaState();
  return (
    <Main company={company}>
      <SectionContainer>
        <Center>
          <DesignedTitle>Thank your for your order {current_order.reference}</DesignedTitle>
          <br />
          <br />
          <Link href={"/orders/" + current_order.id} passHref>
            <DesignedButton>See the order recap</DesignedButton>
          </Link>
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

  return {
    props: {
      company,
    },
  };
}

export default ThankYouPage;
