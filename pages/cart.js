import Link from "next/link";
import React from "react";
import NumberFormat from "react-number-format";
import styledComponents from "styled-components";
import DesignedButton from "../components/common/DesignedButton";
import DesignedTitle from "../components/common/DesignedTitle";
import QuantitySelector from "../components/common/QuantitySelector";
import Recommandations from "../components/common/Recommandations";
import Trash from "../components/icons/Trash";
import Main from "../components/layout/Main";
import SectionContainer from "../components/sections/SectionContainer";
import { useGenukaDispatch, useGenukaState } from "../store/genukaStore";

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
    height: 10vh;
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

const Center = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5rem 0;
    margin-bottom: 15rem;
    flex-direction: column;
`;

function ProductLine({ item, onRemove, currencySymbol, updateQuantity }) {
  const [quantity, setQuantity] = React.useState(item.quantity);
  React.useEffect(() => {
    updateQuantity(item, quantity);
  }, [quantity]);
  return (
    <ProductLineContainer>
      <div className="row">
        <div className="col-md-6">
          <ProductRecap>
            <Image src={item.product.medias[0].thumb} alt={item.product.name} />
            <Informations>
              <ProductName>
                <Link href={"/products/" + item.product.slug} passHref>
                  {item.product.name}
                </Link>
              </ProductName>
              <ProductPrice>
                <NumberFormat thousandsGroupStyle="thousand" value={item.price} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + currencySymbol} />
              </ProductPrice>
              {item.properties &&
                Object.keys(item.properties).map((key) => {
                  return (
                    <ProductVariant key={Math.random()}>
                      {key} : {item.properties[key]}
                    </ProductVariant>
                  );
                })}
            </Informations>
          </ProductRecap>
        </div>
        <div className="col-md-3">
          <QuantitySelector withText={false} quantity={quantity} setQuantity={setQuantity} />
          <RemoveButton
            onClick={() => {
              onRemove(item);
            }}
          >
            <Trash />
            <span style={{ marginLeft: "5px" }}>Remove</span>
          </RemoveButton>
        </div>
        <div className="col-md-3" style={{ textAlign: "right" }}>
          <PriceDisplay>
            <NumberFormat thousandsGroupStyle="thousand" value={item.price * item.quantity} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + currencySymbol} />
          </PriceDisplay>
        </div>
      </div>
    </ProductLineContainer>
  );
}

function CartPage({ company }) {
  const { cart } = useGenukaState();
  const dispatch = useGenukaDispatch();
  const currencySymbol = company.currency.symbol;
  const updateQuantity = (item, quantity) => {
    if (quantity === 0) removeItem(item);
    else
      dispatch({
        type: "cart",
        payload: {
          ...cart,
          items: cart.items.map((_it) => {
            if (item.product.id === _it.product.id) {
              return { ...item, quantity };
            } else return _it;
          }),
        },
      });
  };
  const removeItem = (item) => {
    dispatch({
      type: "cart",
      payload: {
        ...cart,
        items: cart.items.filter((_it) => {
          if (item.product.id !== _it.product.id) return _it;
        }),
      },
    });
  };

  if (cart.items.length === 0)
    return (
      <Main company={company}>
        <SectionContainer>
          <Center>
            <DesignedTitle>Your cart is empty</DesignedTitle>
            <br />
            <br />
            <Link href="/products" passHref>
              <DesignedButton>Back to products</DesignedButton>
            </Link>
          </Center>
        </SectionContainer>
      </Main>
    );
  else
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
          {cart.items.map((item) => {
            return <ProductLine key={item.product.id} item={item} onRemove={removeItem} currencySymbol={currencySymbol} updateQuantity={updateQuantity} />;
          })}
          <div className="row">
            <OrderNoteBox className="col-md-6">
              <Title>Instructions complémentaires concernant la commande</Title>
              <TextArea rows={5} />
            </OrderNoteBox>
            <PricesBox className="col-md-6">
              <PriceLine className="row">
                <PriceLabel className="col-md-8" style={{ textAlign: "right" }}>
                  Subtotal
                </PriceLabel>
                <PriceValue className="col-md-4" style={{ textAlign: "right" }}>
                  <NumberFormat
                    thousandsGroupStyle="thousand"
                    value={cart.items.reduce((total, currentItem) => {
                      return total + currentItem.price;
                    }, 0)}
                    decimalSeparator="."
                    displayType="text"
                    thousandSeparator={true}
                    allowNegative={false}
                    suffix={" "+currencySymbol}
                  />
                </PriceValue>
              </PriceLine>
              <PricesBox>
                <PriceLine className="row">
                  <PriceLabel className="col-md-8" style={{ textAlign: "right" }}>
                    Discount
                  </PriceLabel>
                  <PriceValue className="col-md-4" style={{ textAlign: "right" }}>
                    0 {currencySymbol}
                  </PriceValue>
                </PriceLine>
                <PriceLine className="row">
                  <PriceAction>Apply a discount code</PriceAction>
                </PriceLine>
              </PricesBox>
              <PriceLine className="row">
                <PriceLabel className="col-md-8" style={{ textAlign: "right" }}>
                  Insurance fees
                </PriceLabel>
                <PriceValue className="col-md-4" style={{ textAlign: "right" }}>
                  0 {currencySymbol}
                </PriceValue>
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

export async function getServerSideProps(context) {
  let company, company_url;
  const { req, query, res, asPath, pathname } = context;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  return {
    props: {
      company,
    },
  };
}
export default CartPage;
