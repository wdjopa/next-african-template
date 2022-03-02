/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styledComponents from "styled-components";
import DesignedTitle from "../../components/common/DesignedTitle";
import Pagination from "../../components/common/Pagination";
import ProductCard from "../../components/common/ProductCard";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";
import { genuka_api_2021_10 } from "../../utils/configs";

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

export async function getServerSideProps({ req, res, resolvedUrl, query }) {
  const { collection_id } = query;
  let customer_host = "https://" + req.headers.host;
  let result = await fetch(`${genuka_api_2021_10}/companies/byurl?url=${customer_host}`);
  let company = await result.json();
  let collection , products;
  if(collection_id === "all"){
    collection = {
      name: "Notre catalogue",
      description: "Retrouvez tous nos produits",
      medias : [
        {
          link : company.logo
        }
      ]
    }
    result = await fetch(`${genuka_api_2021_10}/companies/${company.id}/products?per_page=12`);
    products = (await result.json());
   
  }else{
    result = await fetch(`${genuka_api_2021_10}/companies/${company.id}/collections/${collection_id}/minimal`);
   collection = await result.json();
   result = await fetch(`${genuka_api_2021_10}/companies/${company.id}/collections/${collection_id}`);
   products = (await result.json()).products;
  }
  console.log({products, company, collection});

  return {
    props: {
      company,
      collection,
      products,
    },
  };
}

function CollectionPage({ company, collection, products }) {
  
  return (
    <Main company={company}>
      <SectionContainer>
        <Bloc className="row align-items-center">
          <div className="col-md-6">
            <DesignedTitle>{collection.name}</DesignedTitle>
            <CollectionDescription>{collection.description}</CollectionDescription>
          </div>
          <div className="col-md-6">
            <RoundedImage src={collection.medias[0].link} alt={"Collection " + collection.name} />
          </div>
        </Bloc>
        <ProductGrid className="row">
          {products.data.map((product) => {
            return <ProductCard key={Math.random()} product={product} className={"col-sm-6 col-md-4 col-lg-3"} currency={company?.currency?.symbol}/>;
          })}
        </ProductGrid>
        <Pagination pagination={{...products.links,...products.meta }} />
      </SectionContainer>
    </Main>
  );
}

export default CollectionPage;
