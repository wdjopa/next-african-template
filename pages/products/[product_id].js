import React from "react";
import styledComponents from "styled-components";
import Accordion from "../../components/common/Accordion";
import DesignedButton from "../../components/common/DesignedButton";
import QuantitySelector from "../../components/common/quantitySelector";
import Recommandations from "../../components/common/Recommandations";
import Variant from "../../components/common/Variant";
import Arrow from "../../components/icons/Arrow";
import Share from "../../components/icons/Share";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";

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
  justify-content: space-between;
  cursor: pointer;
  align-items:center;
  font-size: 1rem;
`;

function ProductVariants({ variants }) {
  return (
    <>
      <Variant
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
      />
    </>
  );
}


function Thumbnails({ thumbnails }) {
  return <div></div>;
}

function ImagesManager() {
  let thumbnails;
  return (
    <div>
      <div>
        <RoundedImage src={"https://bucket-my-store.s3.eu-west-3.amazonaws.com/5575/207591898_820974238535060_8557725586980579605_n.jpg"} alt="image" />
      </div>
      <Thumbnails thumbnails={thumbnails || []} />
    </div>
  );
}

function ProductDetail({ company, product }) {
  company = {
    name: "MATANGA Shoes",
    description: "Une marque de fabrication de chaussures aux motifs et designs africains",
    logo: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5605/logo_matanga.png",
  };

  const [quantity, setQuantity] = React.useState(1);

  return (
    <Main company={company}>
      <SectionContainer style={{ marginTop: "1rem!important" }}>
        <div className="row">
          <div className="col-md-6 py-4">
            <ImagesManager />
          </div>
          <div className="col-md-6 p-4">
            <ProductName>Double Monk Slip-sneaker</ProductName>
            <ProductPrice>35 000 FCFA</ProductPrice>
            <ProductVariants variants={[]} />
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
          <div style={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vestibulum, lacus eget consequat mollis, felis neque dictum neque, quis venenatis purus libero vitae elit. Nunc in purus id augue imperdiet laoreet porttitor a tortor. In finibus dui id lacus tristique, et convallis sapien elementum. Donec metus turpis, viverra sit amet
            facilisis eget, elementum vel ligula. Morbi posuere metus non neque pharetra, a egestas diam scelerisque. In suscipit felis eget turpis efficitur tincidunt.
            <br />
            <br />
            Mauris non diam tellus. Nunc lobortis quam vel sollicitudin elementum. Praesent ac nunc tincidunt enim ultricies vehicula sed et dui. Vivamus nunc neque, ultricies in nibh a, tincidunt accumsan erat. Aliquam sed elit id sem condimentum consectetur fermentum id ante. Aliquam id dui vel turpis sodales ultrices. Proin laoreet augue nec est
            suscipit interdum. Praesent porta, justo sit amet consectetur cursus, dui enim aliquet turpis, ut hendrerit ex eros vitae mauris. Vestibulum id dolor quis elit pharetra rutrum in at ipsum.
            <br />
            <br />
            Aliquam maximus, diam at ornare malesuada, libero ex tincidunt lacus, et porttitor nisi justo nec ligula. Quisque a porta mauris. Ut dignissim euismod pharetra. Donec id neque sed enim sodales dapibus id viverra tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer tincidunt enim
            quis volutpat elementum.
            <br />
            <br />
            Sed at consectetur magna, non vehicula metus. Nunc et metus volutpat, tristique lectus sed, euismod metus. Curabitur feugiat mollis quam et vehicula. Vestibulum nec mi vitae erat mattis venenatis. Morbi eleifend accumsan velit at sagittis. Pellentesque varius lectus eu scelerisque eleifend. Curabitur ut leo id ex hendrerit venenatis et
            id elit.
            <br />
            <br />
            Proin interdum, justo in ullamcorper imperdiet, est lorem fringilla quam, eget malesuada augue urna vel lorem. Mauris vulputate cursus iaculis. Etiam molestie tristique scelerisque. Vivamus finibus sagittis justo, ut ultricies felis commodo id.
          </div>
        </Accordion>
        <Accordion title={"Customer reviews"}></Accordion>
      </SectionContainer>

      <Recommandations />
    </Main>
  );
}

export default ProductDetail;
