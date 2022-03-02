import React from "react";
import styledComponents from "styled-components";
import DesignedButton from "../common/DesignedButton";
import ProductCard from "../common/ProductCard";
import SectionContainer from "./SectionContainer";

const Title = styledComponents.h2`
    font-size: 2.5rem;
    margin-bottom: 2rem;
`;
const ProductGrid = styledComponents.div`

`;

function FeaturedCollection({ collection, currency }) {
  return (
    <SectionContainer>
      <Title>{collection.collection.name}</Title>
      <ProductGrid className="row">
        {collection.products.data.map((product) => {
          return <ProductCard key={Math.random()} product={product} className={"col-sm-6 col-md-4 col-lg-3"} currency={currency} />;
        })}
      </ProductGrid>
      <div className="text-center mt-5">
        <a href={"/collections/" + collection.collection.id || "/collections/all"}>
          <DesignedButton>SHOW ALL</DesignedButton>
        </a>
      </div>
    </SectionContainer>
  );
}

export default FeaturedCollection;
