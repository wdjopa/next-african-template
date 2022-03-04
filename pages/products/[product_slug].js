import React from "react";
import NumberFormat from "react-number-format";
import styledComponents from "styled-components";
import Accordion from "../../components/common/Accordion";
import DesignedButton from "../../components/common/DesignedButton";
import QuantitySelector from "../../components/common/QuantitySelector";
import Recommandations from "../../components/common/Recommandations";
import Variant from "../../components/common/Variant";
import Share from "../../components/icons/Share";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";
import { useGenukaDispatch } from "../../store/genukaStore";

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
      {variants.map((variant) => {
        return <Variant key={variant.id || Math.random()} variant={variant} />;
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
    border: 3px solid ${(props) => (props.active ? "#333" : "transparent")};
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

function Thumbnails({ medias, onChange, activeImageUrl }) {
  return (
    <ThumbnailsContainer>
      <ThumbnailsContent>
        {medias.map((media, i) => {
          return (
            <Thumb
              key={i}
              active={activeImageUrl === media.link}
              onClick={() => {
                onChange(media.link);
              }}
            >
              <RoundedThumbnail src={media.thumb} alt="image" />
            </Thumb>
          );
        })}
      </ThumbnailsContent>
    </ThumbnailsContainer>
  );
}

const ImageContainer = styledComponents.div`
  height: 50vh;
  
`;

const RoundedImage = styledComponents.img`
    object-fit: contain;
    object-position: center center;
    width: 100%; 
    height: 100%; 
    border-radius: 4px;
`;

function ImagesManager({ medias }) {
  const [mainImageUrl, setMainImageUrl] = React.useState(medias[0].link);

  React.useEffect(() => {
    setMainImageUrl(medias[0].link);
  }, [medias]);
  return (
    <div>
      <ImageContainer className="mb-4">
        <RoundedImage src={mainImageUrl} alt="image" />
      </ImageContainer>
      <Thumbnails
        medias={medias}
        onChange={(media_url) => {
          setMainImageUrl(media_url);
        }}
        activeImageUrl={mainImageUrl}
      />
    </div>
  );
}

function ProductDetail({ company, product, recommandations }) {
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useGenukaDispatch();
  const [productCart, setProductCart] = React.useState({product, price: product.price, quantity})

  React.useEffect(() => {
    setProductCart({ ...productCart, quantity });
  }, [quantity]);

  React.useEffect(() => {
    setProductCart({ product, price: product.price, quantity : 1});
  }, [product]);

  return (
    <Main company={company}>
      <SectionContainer style={{ marginTop: "1rem!important" }}>
        <div className="row">
          <div className="col-md-6 py-4">
            <ImagesManager medias={product.medias} />
          </div>
          <div className="col-md-6 py-4">
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              <NumberFormat thousandsGroupStyle="thousand" value={productCart.price} decimalSeparator="." displayType="text" thousandSeparator={true} allowNegative={false} suffix={" " + company.currency.symbol} />
            </ProductPrice>
            <br />
            <ProductVariants variants={product.variants} />
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <DesignedButton
              full
              onClick={() => {
                dispatch({ type: "add_product", payload: productCart });
              }}
              secondary={true}
            >
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
        {/* <Accordion title={"Customer reviews"}></Accordion> */}
      </SectionContainer>

      <Recommandations recommandations={recommandations} currencySymbol={company.currency.symbol} />
    </Main>
  );
}

export async function getServerSideProps(context) {
  let company, product, company_url, recommandations;
  const { req, query, res, asPath, pathname } = context;
  const { product_slug } = query;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  result = await fetch(`https://api.genuka.com/2021-10/companies/${company.id}/products/slug/${product_slug}`);
  product = await result.json();

  result = await fetch(`https://api.genuka.com/2021-10/companies/${company.id}/products/${product.id}/similar`);
  recommandations = (await result.json()).splice(1, 4);

  return {
    props: {
      company,
      product,
      recommandations,
    }, // will be passed to the page component as props
  };
}

export default ProductDetail;
