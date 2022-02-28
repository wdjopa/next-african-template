import React from "react";
import styledComponents from "styled-components";
import SectionContainer from "../sections/SectionContainer";
import ProductCard from "./ProductCard";

const Title = styledComponents.h4``;

const ProductContainer = styledComponents.div``;

function Recommandations(props) {
  const { product } = props;
  return (
    <SectionContainer {...props}>
      <Title>You may also like</Title>
      <ProductContainer className="row">
        {[
          "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5576/139637656_227061792242590_6392024906148364466_n.jpg",
          "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5573/274689966_1348653875561680_5019483340261502650_n.jfif",
          "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5577/122597167_924226787985107_8132469846152227844_n.jpg",
          "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5569/248459132_259275452803119_4838615338672377152_n.jpg",
        ].map((product) => {
          return <ProductCard key={Math.random()} product={product} className={"col-sm-6 col-md-4 col-lg-3"} />;
        })}
      </ProductContainer>
    </SectionContainer>
  );
}

export default Recommandations;