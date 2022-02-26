import React from "react";
import styledComponents from "styled-components";

const ProductCardContainer = styledComponents.div`
    border-radius: 4px;
    box-shadow: 0 2px 4px #00000022;
    height: auto;
    cursor: pointer;
`;

const ImageContainer = styledComponents.div`
    width: 100%; 
    height: 30vh;
    overflow: hidden;
`;

const Image = styledComponents.img`
    object-fit: cover;
    object-position: center center;

    width: 100%; 
    height: 100%; 

`;
const ProductName = styledComponents.h5`
    font-size: 1.5rem;
    font-weight: 500;
    text-align:center;
    margin-top: 1rem;
    `;
const ProductPrice = styledComponents.div`
    font-size: 1rem;
    font-weight: 400;
    text-align:center;
    padding-bottom: 10px;
`;

function ProductCard({ product, className }) {
  return (
    <div className={className} style={{ padding: "1rem", boxSizing: "border-box" }}>
      <a href={"https://lamater.net"}>
        <ProductCardContainer>
          <ImageContainer>
            <Image src={product} alt={"Chaussure rhino"} />
          </ImageContainer>
          <ProductName>Rhino</ProductName>
          <ProductPrice>25.000 FCFA</ProductPrice>
        </ProductCardContainer>
      </a>
    </div>
  );
}

export default ProductCard;
