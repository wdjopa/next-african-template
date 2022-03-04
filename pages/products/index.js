/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styledComponents from "styled-components";
import DesignedTitle from "../../components/common/DesignedTitle";
import Pagination from "../../components/common/Pagination";
import ProductCard from "../../components/common/ProductCard";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";

const CollectionDescription = styledComponents.div`
  font-size: 1.25rem;
  font-family: "Open Sans", sans-serif;
  margin: 1.5rem 0;
  text-align:justify;
`;
const Bloc = styledComponents.div`
    margin-bottom: 4rem;
`;

const RoundedImage = styledComponents.img`
    object-fit: cover;
    object-position: center center;
    width: 100%; 
    height: 100%; 
    max-height: 50vh;
    border-radius: 4px;
    box-shadow: 0px 4px 4px #00000022;
`;

const ProductGrid = styledComponents.div`

`;

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  let company_url = "https://" + req.headers.host;
  
  let company,  products, result;
  
  result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  result = await fetch(`https://api.genuka.com/2021-10/companies/${company.id}/products?per_page=12`);
  products = (await result.json());

  return {
    props: {
      company,
      products,
    }, // will be passed to the page component as props
  };
}

function CatalogPage({ company, collection, products }) {
  return (
    <Main company={company}>
      <SectionContainer>
        <Bloc className="row align-items-center">
          <div className="col-md-6">
            <DesignedTitle>Notre catalogue</DesignedTitle>
            <CollectionDescription>Découvrez tous nos produits</CollectionDescription>
          </div>
          <div className="col-md-6">
            <RoundedImage src={company.logo} alt={"Logo de l'entreprise "+company.name } />
          </div>
        </Bloc>
        <ProductGrid className="row">
          {products.data.map((product) => {
            return <ProductCard key={Math.random()} product={product} className={"col-sm-6 col-md-4 col-lg-3"} currencySymbol={company.currency.symbol} />;
          })}
        </ProductGrid>
        <Pagination />
      </SectionContainer>
    </Main>
  );
}

export default CatalogPage;
