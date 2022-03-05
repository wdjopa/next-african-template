import Link from "next/link";
import React from "react";
import NumberFormat from "react-number-format";
import styledComponents from "styled-components";
import { useGenukaState } from "../../store/genukaStore";
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
    object-position: center center;
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
  const { cart, company } = useGenukaState();
  const subtotal = cart.items.reduce((total, currentItem) => {
    return total + currentItem.price * currentItem.quantity;
  }, 0);
  const discount = 0;

  if (!company ) return <></>;
  return (
    <Container {...props}>
      <Title>Récapitulatif de la commande</Title>
      <Link href="/checkout" passHref>
        <>
          {cart.shipping_address && (
            <div className="my-2">
              <strong>{cart.shipping_address?.label}</strong>
              <br />
              {cart.shipping_address?.given_name} {cart.shipping_address?.family_name} ({cart.shipping_address?.attributes?.tel}
              )
              <br />
              {cart.shipping_address?.street}, {cart.shipping_address?.city},<br /> {cart.shipping_address?.postal_code} {cart.shipping_address?.country}
            </div>
          )}
        </>
      </Link>
      <Divider />
      {cart.items.map((item) => {
        return (
          <ProductLine key={item.product.id} className="row">
            <div className="col-3">
              <ImageContainer>
                <Image src={item.product.medias[0].thumb} alt={"Image de " + item.product.name} />
              </ImageContainer>
            </div>
            <ProductInformations className="col-9">
              <ProductName href={"/products/" + item.product.slug} passHref>
                {item.product.name}
              </ProductName>
              <ProductPrice>
                <NumberFormat thousandsGroupStyle="thousand" value={item.price} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
              </ProductPrice>
              <QuantityCounter>Quantity : {item.quantity}</QuantityCounter>
              <ProductVariants key={Math.random()}>
                {item.properties &&
                  Object.keys(item.properties)
                    .map((key) => {
                      return item.properties[key];
                    })
                    .join(" / ")}
              </ProductVariants>
            </ProductInformations>
          </ProductLine>
        );
      })}

      <PricesBox className="col-md-12">
        <PriceLine className="row">
          <PriceLabel className="col-md-6" style={{ textAlign: "left" }}>
            Subtotal
          </PriceLabel>
          <PriceValue className="col-md-6" style={{ textAlign: "right" }}>
            <NumberFormat thousandsGroupStyle="thousand" value={subtotal} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
          </PriceValue>
        </PriceLine>
        <PriceLine className="row">
          <PriceLabel className="col-md-6" style={{ textAlign: "left" }}>
            Discount
          </PriceLabel>
          <PriceValue className="col-md-6" style={{ textAlign: "right" }}>
            <NumberFormat thousandsGroupStyle="thousand" value={discount} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
          </PriceValue>
        </PriceLine>
        <PriceLine className="row">
          <PriceLabel className="col-md-6" style={{ textAlign: "left" }}>
            Shipping
          </PriceLabel>
          <PriceValue className="col-md-6" style={{ textAlign: "right" }}>
            <NumberFormat thousandsGroupStyle="thousand" value={company.shipping_fee || 0} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
          </PriceValue>
        </PriceLine>
      </PricesBox>
      <Divider />
      <PriceLine className="row mt-5">
        <PriceLabel className="col-md-6" style={{ alignItems: "center", display: "flex" }}>
          Total
        </PriceLabel>
        <PriceValue className="col-md-6" style={{ textAlign: "right", fontSize: "1.8rem" }}>
          <NumberFormat thousandsGroupStyle="thousand" value={subtotal + company.shipping_fee - discount} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
        </PriceValue>
      </PriceLine>
    </Container>
  );
}

export default OrderRecap;
