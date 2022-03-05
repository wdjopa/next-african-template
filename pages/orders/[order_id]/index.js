import React from 'react'
import Main from '../../../components/layout/Main';
import SectionContainer from '../../../components/sections/SectionContainer';

function OrderDetail({company, order}) {
  return (
      <Main company={company}>
          <SectionContainer>
              
          </SectionContainer>
      </Main>
  )
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


export default OrderDetail