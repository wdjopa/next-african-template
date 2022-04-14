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

  const {per_page = 12, page = 1} = query
  result = await fetch(`https://api.genuka.com/2021-10/companies/${company.id}/products?per_page=${per_page}&page=${page}`);
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
    <Main
      company={company}
      head={
        <>
          <title>
            {company.name} | Catalog - check out our products
          </title>
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
        <Bloc className="row align-items-center">
          <div className="col-md-6">
            <DesignedTitle>Notre catalogue</DesignedTitle>
            <CollectionDescription>Découvrez tous nos produits</CollectionDescription>
          </div>
          <div className="col-md-6">
            <RoundedImage src={company.logo} alt={"Logo de l'entreprise " + company.name} />
          </div>
        </Bloc>
        <ProductGrid className="row">
          {products.data.map((product) => {
            return <ProductCard key={Math.random()} product={product} className={"col-sm-6 col-lg-4 col-xl-3"} currencySymbol={company.currency.symbol} />;
          })}
        </ProductGrid>
        <Pagination pagination={{ ...products.links, ...products.meta }} />
      </SectionContainer>
    </Main>
  );
}

export default CatalogPage;
