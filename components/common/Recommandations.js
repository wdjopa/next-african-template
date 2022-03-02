import React from "react";
import styledComponents from "styled-components";
import SectionContainer from "../sections/SectionContainer";
import ProductCard from "./ProductCard";

const Title = styledComponents.h4``;

const ProductContainer = styledComponents.div``;

function Recommandations(props) {
  const { products, currency } = props;
  if(products.length === 0)
  return <></>
  return (
    <SectionContainer {...props}>
      <Title>You may also like</Title>
      <ProductContainer className="row">
        {products.map((product) => {
          return <ProductCard key={Math.random()} product={product} className={"col-sm-6 col-md-4 col-lg-3"} currency={currency} />;
        })}
      </ProductContainer>
    </SectionContainer>
  );
}

export default Recommandations;
