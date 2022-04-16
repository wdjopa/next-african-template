import Link from "next/link";
import React from "react";
import NumberFormat from "react-number-format";
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
     white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
    `;
const ProductPrice = styledComponents.div`
    font-size: 1rem;
    font-weight: 400;
    text-align:center;
    padding-bottom: 10px;
`;

function ProductCard(props) {
    const { product, currencySymbol = "FCFA" } = props;
    return (
      <div {...props} style={{ padding: "1rem", boxSizing: "border-box" }}>
        <Link href={"/products/" + product.slug} passHref>
          <ProductCardContainer>
            <ImageContainer>
              <Image src={product?.medias?.length > 0 ? product.medias[0].thumb : ""} alt={"Image du produit " + product.name} />
            </ImageContainer>
            <ProductName title={product.name}>{product.name}</ProductName>
            <ProductPrice>
              <NumberFormat thousandsGroupStyle="thousand" value={product.price} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + currencySymbol} />
            </ProductPrice>
          </ProductCardContainer>
        </Link>
      </div>
    );
}

export default ProductCard;
