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

function Custom404({ company }) {
  company = {
    name: "MATANGA Shoes",
    description: "Une marque de fabrication de chaussures aux motifs et designs africains",
    logo: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5605/logo_matanga.png",
  };
  if (!company) return <EmptyStore />;
  return (
    <Main company={company}>
      <SectionContainer>
        <Center>
          <DesignedTitle>
          404 - Page not found
          </DesignedTitle>
        </Center>
      </SectionContainer>
    </Main>
  );
}

export default Custom404;
