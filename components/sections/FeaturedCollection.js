import React from "react";
import styledComponents from "styled-components";
import DesignedButton from "../common/DesignedButton";
import ProductCard from "../common/ProductCard";
import SectionContainer from "./SectionContainer";

const Title = styledComponents.h2`
    font-size: 2.5rem;
    margin-bottom: 2rem;
`;
const ProductGrid = styledComponents.div`

`;

function FeaturedCollection({ collection_id, company_id, currencySymbol }) {
  const [collection, setCollection] = React.useState();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function getCollection() {
    let result = await fetch(`https://api.genuka.com/2021-10/companies/${company_id}/collections/${collection_id}?per_page=8`);
    let c = await result.json();
    setCollection(c.collection);
    setProducts(c.products);
    setLoading(false);
  }

  React.useEffect(() => {
    if (collection_id) {
      setLoading(true);
      getCollection();
    }
  }, [collection_id]);

  if (loading) return <></>;

  return (
    <SectionContainer>
      <Title>Collection {collection.name}</Title>
      <ProductGrid className="row">
        {products.data.map((product) => {
          return <ProductCard key={Math.random()} product={product} className={"col-sm-6 col-md-4 col-lg-3"} currencySymbol={currencySymbol} />;
        })}
      </ProductGrid>
      <div className="text-center mt-5">
        <a href={"/collections/" + collection.id}>
          <DesignedButton>SHOW ALL</DesignedButton>
        </a>
      </div>
    </SectionContainer>
  );
}

export default FeaturedCollection;
