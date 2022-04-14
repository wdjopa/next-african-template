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
  let company, collection, products, company_url;
  const { req, query, res, asPath, pathname } = context;
  const { collection_id } = query;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  result = await fetch(`https://api.genuka.com/2021-10/companies/${company.id}/collections/${collection_id}/minimal`);
  collection = await result.json();

  result = await fetch(`https://api.genuka.com/2021-10/companies/${company.id}/collections/${collection_id}`);
  products = (await result.json()).products;

  return {
    props: {
      company,
      collection,
      products,
    }, // will be passed to the page component as props
  };
}

function CollectionPage({ company, collection, products }) {
  return (
    <Main
      company={company}
      head={
        <>
          <title>
            {collection.name} - {collection?.description?.replace(/<[^>]*>?/gm, "")} | {company.name}
          </title>
          <meta name="description" content={collection.description} />
          <meta name="keywords" content={collection?.description?.split(" ").join(", ")} />
          <meta name="author" content={collection.name} />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content={collection.name} />
          <meta name="msapplication-TileColor" content="#222" />
          <meta name="msapplication-TileImage" content={collection.medias.length > 0 ? collection.medias[0].link : company.logo} />
          <meta name="theme-color" content="#222" />
          <meta property="og:title" content={collection.name} />
          <meta property="og:description" content={collection.description} />
          <meta property="og:image" content={collection.medias.length > 0 ? collection.medias[0].link : company.logo} />
          <meta property="og:url" content={company.website + "/collections/" + collection.slug} />
          <meta property="og:type" content="product collection" />
          <meta property="og:site_name" content={collection.name} />
        </>
      }
    >
      <SectionContainer>
        <Bloc className="row align-items-center">
          <div className="col-md-6">
            <DesignedTitle>{collection.name}</DesignedTitle>
            <CollectionDescription>{collection.description}</CollectionDescription>
          </div>
          <div className="col-md-6">
            <RoundedImage src={collection.medias.length > 0 ? collection.medias[0].link : company.logo} alt={"Image de la collection " + collection.name} />
          </div>
        </Bloc>
        <ProductGrid className="row">
          {products.data.map((product) => {
            return <ProductCard key={Math.random()} product={product} className={"col-sm-6 col-md-4 col-xl-3"} currencySymbol={company.currency.symbol} />;
          })}
        </ProductGrid>
        <Pagination pagination={{ ...products.links, ...products.meta }} />
      </SectionContainer>
    </Main>
  );
}

export default CollectionPage;
