import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import { getCompany } from "../../store/genukaStore";

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

function ProductCard(props) {
    const { product, currency = "F CFA" } = props
    return (
      <div {...props} style={{ padding: "1rem", boxSizing: "border-box" }}>
        <Link href={"/products/"+product.slug} passHref>
          <ProductCardContainer>
            <ImageContainer>
              <Image src={product?.medias?.length > 0 ? product.medias[0].thumb : ""} alt={"Image "+product.name} />
            </ImageContainer>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price} {currency}</ProductPrice>
          </ProductCardContainer>
        </Link>
      </div>
    );
}

export default ProductCard;
