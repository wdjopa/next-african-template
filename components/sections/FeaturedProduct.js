import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import { ProductVariants } from "../../pages/products/[product_id]";
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


function FeaturedProduct({ product, currency }) {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <SectionContainer>
      <div className="row">
        <div className="col-md-6 py-4">
          <RoundedImage src={product.medias[0].link} alt="image" />
        </div>
        <div className="col-md-6 p-4">
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price} {currency}</ProductPrice>
          <ProductVariants variants={product.variants} />
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <DesignedButton full onClick={() => {}} secondary={true}>
            Add to cart
          </DesignedButton>
          <Link href={"/products/"+product.slug} passHref style={{ marginTop: "1rem", display: "block" }}>
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
