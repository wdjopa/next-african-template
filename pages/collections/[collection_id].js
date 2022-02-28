/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import styledComponents from 'styled-components';
import DesignedTitle from '../../components/common/DesignedTitle';
import Pagination from '../../components/common/Pagination';
import ProductCard from '../../components/common/ProductCard';
import Main from '../../components/layout/Main'
import SectionContainer from '../../components/sections/SectionContainer';

const CollectionDescription = styledComponents.div`
  font-size: 1.25rem;
  font-family: "Open Sans", sans-serif;
  margin: 1.5rem 0;
  text-align:justify;
`;
const Bloc = styledComponents.div`
    margin-bottom: 4rem;
`;


const RoundedImage = styledComponents.img`
    object-fit: cover;
    object-position: center center;
    width: 100%; 
    height: 100%; 
    max-height: 50vh;
    border-radius: 4px;
    box-shadow: 0px 4px 4px #00000022;
`;

const ProductGrid = styledComponents.div`

`;


function CollectionPage({ company, collection }) {
     company = {
       name: "MATANGA Shoes",
       description: "Une marque de fabrication de chaussures aux motifs et designs africains",
       logo: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5605/logo_matanga.png",
     };
  return (
    <Main company={company}>
      <SectionContainer>
        <Bloc className="row align-items-center">
          <div className="col-md-6">
            <DesignedTitle>Collection Masaï</DesignedTitle>
            <CollectionDescription>Comme un hommage à l'un des peuples les plus créatifs, Résilients et courageux face au changement permanent du monde et de nos sociétés. À une telle Authencite nous dedions une collection à acquérir comme des pièces d'histoire.</CollectionDescription>
          </div>
          <div className="col-md-6">
            <RoundedImage src={"https://bucket-my-store.s3.eu-west-3.amazonaws.com/5573/274689966_1348653875561680_5019483340261502650_n.jfif"} alt={""} />
          </div>
        </Bloc>
        <ProductGrid className="row">
          {[
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5576/139637656_227061792242590_6392024906148364466_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5573/274689966_1348653875561680_5019483340261502650_n.jfif",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5577/122597167_924226787985107_8132469846152227844_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5569/248459132_259275452803119_4838615338672377152_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5576/139637656_227061792242590_6392024906148364466_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5573/274689966_1348653875561680_5019483340261502650_n.jfif",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5577/122597167_924226787985107_8132469846152227844_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5569/248459132_259275452803119_4838615338672377152_n.jpg",
          ].map((product) => {
            return <ProductCard key={Math.random()} product={product} className={"col-sm-6 col-md-4 col-lg-3"} />;
          })}
        </ProductGrid>
        <Pagination />
      </SectionContainer>
    </Main>
  );
}

export default CollectionPage