import React, { useEffect } from "react";
import styledComponents from "styled-components";
import Accordion from "../../components/common/Accordion";
import DesignedButton from "../../components/common/DesignedButton";
import QuantitySelector from "../../components/common/QuantitySelector";
import Recommandations from "../../components/common/Recommandations";
import Variant from "../../components/common/Variant";
import Share from "../../components/icons/Share";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";
import { genuka_api_2021_10 } from "../../utils/configs";

const RoundedImage = styledComponents.img`
    object-fit: cover;
    object-position: center center;
    width: 100%; 
    height: 100%; 
    border-radius: 4px;
    box-shadow: 0px 4px 4px #00000022;
`;

const ProductName = styledComponents.h2`
  font-size: 2.5rem;
`;
const ProductPrice = styledComponents.h4`
  font-size: 2rem;
  color: var(--secondary-color);
  font-weight: 300;
`;

const TransparentLink = styledComponents.div`
  padding: 1rem 0;
  justify-content: space-between;
  cursor: pointer;
  align-items:center;
  font-size: 1rem;
`;

export function ProductVariants({ variants }) {
  return (
    <>
    {variants.map(variant => {
      return <Variant key={variant.id} variant={variant} />
    })}
      {/* <Variant
        variant={{
          name: "Color",
          options: [
            {
              value: "#AD1E44",
            },
            {
              value: "#348989",
            },
            {
              value: "#0C7FEA",
            },
          ],
        }}
      />
      <Variant
        variant={{
          name: "Size",
          options: [
            {
              value: "37",
            },
            {
              value: "39",
            },
            {
              value: "41",
            },
            {
              value: "42",
            },
            {
              value: "45",
            },
          ],
        }}
      /> */}
    </>
  );
}

const ThumbnailsContainer = styledComponents.div`
    overflow-x: auto;
`;
const ThumbnailsContent = styledComponents.div`
    @media screen and (max-width: 760px){
        white-space: nowrap;
    }
`;

const Thumb = styledComponents.div`
    height: 5rem;
    width: 5rem;
    border: 3px solid ${(props) => (props.active ? "#333" : "white")};
    border-radius: 4px;
    margin: 1rem 0;
    margin-right: .81rem;
    display: inline-block;
`;

const RoundedThumbnail = styledComponents.img`
    object-fit: contain;
    object-position: center center;
    width: 100%; 
    height: 100%; 
    border-radius: 4px;
`;

function Thumbnails({ medias, selectThumbnail, selectedMedia }) {
  return (
    <ThumbnailsContainer>
      <ThumbnailsContent>
        {medias.map((media, i) => {
          return (
            <Thumb key={i} active={media.id === selectedMedia.id}>
              <RoundedThumbnail
                src={media.thumb}
                alt="image miniature "
                onClick={() => {
                  selectThumbnail(media);
                }}
              />
            </Thumb>
          );
        })}
      </ThumbnailsContent>
    </ThumbnailsContainer>
  );
}

function ImagesManager({ product }) {
  let medias = product.medias;
  const [selectedImage, setSelectedImage] = React.useState(product.medias[0]);
  React.useEffect(()=>{
    setSelectedImage(product.medias[0])
  }, [product])
  return (
    <div>
      <div className="mb-4">
        <RoundedImage src={selectedImage.link} alt={"image de " + product.name} />
      </div>
      <Thumbnails
        medias={medias}
        selectedMedia={selectedImage}
        selectThumbnail={(media) => {
          setSelectedImage(media);
        }}
      />
    </div>
  );
}

function ProductDetail({ company, product, recommandations }) {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <Main company={company}>
      <SectionContainer style={{ marginTop: "1rem!important" }}>
        <div className="row">
          <div className="col-md-6 py-4">
            <ImagesManager product={product} />
          </div>
          <div className="col-md-6 py-4">
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              {product.price} {company.currency.symbol}
            </ProductPrice>
            <br />
            {product.variants && <ProductVariants variants={product.variants} />}
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <DesignedButton full onClick={() => {}} secondary={true}>
              Add to cart
            </DesignedButton>
            <DesignedButton full onClick={() => {}} style={{ marginTop: "2rem" }}>
              Buy now
            </DesignedButton>
            <a href="" style={{ display: "inline-block" }}>
              <TransparentLink>
                <Share />
                <span style={{ padding: "0 1rem" }}>Share the product</span>
              </TransparentLink>
            </a>
          </div>
        </div>
        <Accordion title={"Description"}>
          <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: product.description }} />
        </Accordion>
        <Accordion title={"Customer reviews"}></Accordion>
      </SectionContainer>

      <Recommandations products={recommandations} currency={company.currency.symbol}/>
    </Main>
  );
}

export async function getServerSideProps({ req, res, resolvedUrl, query }) {
  const { product_id: slug } = query;
  let customer_host = "https://" + req.headers.host;
  let result = await fetch(`${genuka_api_2021_10}/companies/byurl?url=${customer_host}`);
  let company = await result.json();

  result = await fetch(`${genuka_api_2021_10}/companies/${company.id}/products/slug/${slug}`);
  let product = (await result.json());

  result = await fetch(`${genuka_api_2021_10}/companies/${company.id}/products/${product.id}/similar`);
  let recommandations = (await result.json()).splice(1,4);
  // console.log({ product, company, recommandations });

  return {
    props: {
      company,
      product,
      recommandations
    },
  };
}

export default ProductDetail;
