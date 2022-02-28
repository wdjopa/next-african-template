import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import DesignedButton from "../components/common/DesignedButton";
import DesignedTitle from "../components/common/DesignedTitle";
import QuantitySelector from "../components/common/quantitySelector";
import Recommandations from "../components/common/Recommandations";
import Trash from "../components/icons/Trash";
import Main from "../components/layout/Main";
import SectionContainer from "../components/sections/SectionContainer";

const Header = styledComponents.div`
    margin-top: 2rem;
    font-weight: 300;
    padding: .5rem 0;
    text-transform: uppercase;
    border-bottom: 1px solid #CCC; 
`;

const TextArea = styledComponents.textarea`
    width: 100%;
    background: #F5F5F5;
    border: none;
    border-radius: 4px;
`;

const OrderNoteBox = styledComponents.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;
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
const PriceAction = styledComponents.small`
    color: var(--secondary-color);
    cursor: pointer;
    text-align: right;
`;
const Title = styledComponents.h6`
    font-family: "Open Sans";
    font-weight: 300;
`;






const Image = styledComponents.img`
    height: 20vh;
    object-fit: cover; 
`;

const ProductRecap = styledComponents.div`
    display: flex;
    flew-wrap: wrap;
   
`;
const Informations = styledComponents.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 10px;
`;
const ProductLineContainer = styledComponents.div`
    margin: 1rem 0;
    padding: 1rem 0;
    border-bottom: 1px solid #CCC; 
`;
const PriceDisplay = styledComponents.div`
    font-size: 1.5rem;
    font-weight: 300;
`;

const ProductName = styledComponents.h5``;

const ProductPrice = styledComponents.span`
    margin-bottom: 10px;
    font-family: "Open Sans";
`;
const ProductVariant = styledComponents.small`
    font-family: "Open Sans";
    margin-bottom: 5px;
`;

const RemoveButton = styledComponents.div`
    color: #FF4343;
    font-family: "Open Sans";
    cursor: pointer;
`;

function ProductLine({ product, onRemove }) {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <ProductLineContainer>
      <div className="row">
        <div className="col-md-6">
          <ProductRecap>
            <Image src={"https://bucket-my-store.s3.eu-west-3.amazonaws.com/5569/248459132_259275452803119_4838615338672377152_n.jpg"} alt={"Shoe"} />
            <Informations>
              <ProductName>MATANGA QUATRO UNISEXE</ProductName>
              <ProductPrice>30.000 FCFA</ProductPrice>
              <ProductVariant>Color : motif 2</ProductVariant>
              <ProductVariant>Size : 2</ProductVariant>
            </Informations>
          </ProductRecap>
        </div>
        <div className="col-md-3">
          <QuantitySelector withText={false} quantity={quantity} setQuantity={setQuantity} />
          <RemoveButton onClick={onRemove}>
            <Trash />
            <span style={{ marginLeft: "5px" }}>Remove</span>
          </RemoveButton>
        </div>
        <div className="col-md-3" style={{ textAlign: "right" }}>
          <PriceDisplay>2.970.000 FCFA</PriceDisplay>
        </div>
      </div>
    </ProductLineContainer>
  );
}

function cart({ company }) {
  company = {
    name: "MATANGA Shoes",
    description: "Une marque de fabrication de chaussures aux motifs et designs africains",
    logo: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5605/logo_matanga.png",
  };

  return (
    <Main company={company}>
      <SectionContainer>
        <DesignedTitle>Your cart</DesignedTitle>
        <Header className="d-none d-md-block">
          <div className="row">
            <div className="col-md-6">Product</div>
            <div className="col-md-3">Quantity</div>
            <div className="col-md-3" style={{ textAlign: "right" }}>
              Total
            </div>
          </div>
        </Header>
        <>
          <ProductLine />
          <ProductLine />
        </>
        <div className="row">
          <OrderNoteBox className="col-md-6">
            <Title>Instructions complémentaires concernant la commande</Title>
            <TextArea rows={5} />
          </OrderNoteBox>
          <PricesBox className="col-md-6">
            <PriceLine className="row">
              <PriceLabel className="col-md-8" style={{ textAlign: "right" }}>Subtotal</PriceLabel>
              <PriceValue className="col-md-4" style={{ textAlign: "right" }}>30.000 FCFA</PriceValue>
            </PriceLine>
            <PricesBox>
              <PriceLine className="row">
                <PriceLabel className="col-md-8" style={{ textAlign: "right" }}>Discount</PriceLabel>
                <PriceValue className="col-md-4" style={{ textAlign: "right" }}>0 FCFA</PriceValue>
              </PriceLine>
              <PriceLine className="row">
                <PriceAction>Apply a discount code</PriceAction>
              </PriceLine>
            </PricesBox>
            <PriceLine className="row">
              <PriceLabel className="col-md-8" style={{ textAlign: "right" }}>Insurance fees</PriceLabel>
              <PriceValue className="col-md-4" style={{ textAlign: "right" }}>2.000 FCFA</PriceValue>
            </PriceLine>
            <PriceLine className="mt-4 d-flex justify-content-center">
              <Link href="/checkout" passHref>
                <DesignedButton>Proceed to checkout</DesignedButton>
              </Link>
            </PriceLine>
          </PricesBox>
        </div>
      </SectionContainer>

      <Recommandations />
    </Main>
  );
}

export default cart;
