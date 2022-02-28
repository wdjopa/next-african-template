import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import Divider from "./Divider";

const Title = styledComponents.h3`
    border-bottom: 2px solid #AAA;
    padding-bottom: 10px;
    font-size: 1.5rem;
    margin-top: 1rem;
`;
const Container = styledComponents.div``;

const PricesBox = styledComponents.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    margin-bottom: .5rem;
`;

const PriceLine = styledComponents.div`
    display: flex;
    justify-content: flex-end;
`;

const PriceLabel = styledComponents.div`
    font-family: "Open Sans";
    padding: 10px;
`;
const PriceValue = styledComponents.div`
    display: flex;
    justify-content: flex-end;
    font-family: "Open Sans";
    font-weight: 300;
    padding: 10px;
`;

const Image = styledComponents.img`
    border-radius: 4px;
    object-fit: cover;
    max-width: 100%;
    max-height: 5rem;
    margin-bottom: 1rem;
`;

const ImageContainer = styledComponents.div`
    position: relative;
    height: 80%;
    width: auto;
`;
const ProductLine = styledComponents.div`
    margin-top: 1rem;
    border-bottom: 1px solid #EEE;
    padding-bottom: .5rem;
`;
const ProductInformations = styledComponents.div`
`;

const ProductName = styledComponents(Link)`
    font-size: .85rem;
`;
const ProductPrice = styledComponents.span`
    display: block;
    font-family: "Open Sans";
    font-size: .95rem;
`;

const QuantityCounter = styledComponents.span`
    font-size: .85rem;
    font-family: "Open Sans";
    display: block;
    color: #777;
`;
const ProductVariants = styledComponents.small`
    font-family: "Open Sans";
    color: #777;
`;

function OrderRecap(props) {
  return (
    <Container {...props}>
      <Title>Récapitulatif de la commande</Title>
      <ProductLine className="row">
        <div className="col-3">
          <ImageContainer>
            <Image src={"https://bucket-my-store.s3.eu-west-3.amazonaws.com/5570/274607836_484834773151976_5519080402532895223_n.jfif"} alt={"Image de chaussure"} />
          </ImageContainer>
        </div>
        <ProductInformations className="col-9">
          <ProductName href="/products/2" passHref>
            MATANGA QUATRO UNISEXE
          </ProductName>
          <ProductPrice>30.000 FCFA</ProductPrice>
          <QuantityCounter>Quantity : 99</QuantityCounter> 
          <ProductVariants>Motif 2 / 35</ProductVariants>
        </ProductInformations>
      </ProductLine>
      <PricesBox className="col-md-12">
        <PriceLine className="row">
          <PriceLabel className="col-md-6" style={{ textAlign: "left" }}>
            Subtotal
          </PriceLabel>
          <PriceValue className="col-md-6" style={{ textAlign: "right" }}>
            30.000 FCFA
          </PriceValue>
        </PriceLine>
        <PriceLine className="row">
          <PriceLabel className="col-md-6" style={{ textAlign: "left" }}>
            Discount
          </PriceLabel>
          <PriceValue className="col-md-6" style={{ textAlign: "right" }}>
            30.000 FCFA
          </PriceValue>
        </PriceLine>
        <PriceLine className="row">
          <PriceLabel className="col-md-6" style={{ textAlign: "left" }}>
            Shipping
          </PriceLabel>
          <PriceValue className="col-md-6" style={{ textAlign: "right" }}>
            30.000 FCFA
          </PriceValue>
        </PriceLine>
      </PricesBox>
      <Divider />
      <PriceLine className="row mt-5">
        <PriceLabel className="col-md-6" style={{ alignItems: "center", display: "flex" }}>
          Total
        </PriceLabel>
        <PriceValue className="col-md-6" style={{ textAlign: "right", fontSize: "1.8rem" }}>
          90.000 FCFA
        </PriceValue>
      </PriceLine>
    </Container>
  );
}

export default OrderRecap;
