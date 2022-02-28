import styledComponents from "styled-components";
import CollectionCard from "../../components/common/CollectionCard";
import DesignedTitle from "../../components/common/DesignedTitle";
import Pagination from "../../components/common/Pagination";
import EmptyStore from "../../components/EmptyStore";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";

const CollectionListContainer = styledComponents.div`

`;

const CollectionDescription = styledComponents.div`
  font-size: 1.5rem;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 1.5rem;
`;

export default function Home({ company, collections = [] }) {
  company = {
    name: "MATANGA Shoes",
    description: "Une marque de fabrication de chaussures aux motifs et designs africains",
    logo: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5605/logo_matanga.png",
  };
  let pagination;
  if (!company) return <EmptyStore />;

  return (
    <Main company={company}>
      <SectionContainer>
        <DesignedTitle>Collections</DesignedTitle>
        <CollectionDescription>Découvrez toutes nos collections 2022</CollectionDescription>
        <CollectionListContainer className="row">
          {[
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5576/139637656_227061792242590_6392024906148364466_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5573/274689966_1348653875561680_5019483340261502650_n.jfif",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5577/122597167_924226787985107_8132469846152227844_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5569/248459132_259275452803119_4838615338672377152_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5576/139637656_227061792242590_6392024906148364466_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5573/274689966_1348653875561680_5019483340261502650_n.jfif",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5577/122597167_924226787985107_8132469846152227844_n.jpg",
            "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5569/248459132_259275452803119_4838615338672377152_n.jpg",
          ].map((collection) => {
            return <CollectionCard className="col-lg-4 col-md-6" key={collection.id || Math.random()} collection={collection} />;
          })}
        </CollectionListContainer>
        <Pagination pagination={pagination} />
      </SectionContainer>
    </Main>
  );
}
