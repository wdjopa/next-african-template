import Link from "next/link";
import React from "react";
import NumberFormat from "react-number-format";
import styledComponents from "styled-components";
import { ProductVariants } from "../../pages/products/[product_slug]";
import { getProduct, useGenukaDispatch } from "../../store/genukaStore";
import DesignedButton from "../common/DesignedButton";
import QuantitySelector from "../common/QuantitySelector";
import Variant from "../common/Variant";
import Arrow from "../icons/Arrow";
import SectionContainer from "./SectionContainer";

const RoundedImage = styledComponents.img`
    object-fit: cover;
    object-position: center center;
    width: 100%; 
    height: 100%; 
    border-radius: 4px;
    box-shadow: 0px 4px 4px #00000022;
`;

const ProductName = styledComponents.h2`
  font-size: 3.5rem;
`;
const ProductPrice = styledComponents.h4`
  font-size: 2rem;
  color: var(--secondary-color);
  font-weight: 300;
`;

const TransparentLink = styledComponents.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items:center;
  font-size: 1.5rem;
`;

function FeaturedProduct({ product_id, currencySymbol }) {
  const [product, setProduct] = React.useState();
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  const dispatch = useGenukaDispatch();
  const [productCart, setProductCart] = React.useState();

  React.useEffect(() => {
    if (productCart) setProductCart({ ...productCart, quantity });
  }, [quantity]);

  React.useEffect(() => {
    if (product) setProductCart({ product, price: product.price, quantity: 1 });
  }, [product]);

  async function getProduct() {
    let result = await fetch(`https://api.genuka.com/2021-10/products/${product_id}`);
    let p = await result.json();
    setProduct(p);
    setLoading(false);
  }

  React.useEffect(() => {
    if (product_id) {
      setLoading(true);
      getProduct();
    }
  }, [product_id]);

  if (loading) return <></>;
  return (
    <SectionContainer>
      <div className="row">
        <div className="col-md-6 py-4">
          <RoundedImage src={product.medias[0].link} alt={"Image du produit " + product.name} />
        </div>
        <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
          <ProductName>{product.name}</ProductName>
          <ProductPrice>
            <NumberFormat thousandsGroupStyle="thousand" value={product.price} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + currencySymbol} />
          </ProductPrice>
          <ProductVariants variants={product.variants} />
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <DesignedButton
            full
            onClick={() => {
              dispatch({ type: "add_product", payload: productCart });
              dispatch({ type: "notification", payload: product.name + " added to cart" });
            }}
            secondary={true}
          >
            Add to cart
          </DesignedButton>
          <Link href={"/products/" + product.slug} passHref style={{ marginTop: "1rem", display: "block" }}>
            <TransparentLink>
              <span>Go to product page</span>
              <Arrow />
            </TransparentLink>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}

export default FeaturedProduct;
