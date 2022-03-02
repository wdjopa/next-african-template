import styledComponents from "styled-components";
import CollectionCard from "../../components/common/CollectionCard";
import DesignedTitle from "../../components/common/DesignedTitle";
import Pagination from "../../components/common/Pagination";
import EmptyStore from "../../components/EmptyStore";
import Main from "../../components/layout/Main";
import SectionContainer from "../../components/sections/SectionContainer";
import { genuka_api_2021_10 } from "../../utils/configs";

const CollectionListContainer = styledComponents.div`

`;

const CollectionDescription = styledComponents.div`
  font-size: 1.5rem;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 1.5rem;
`;


export async function getServerSideProps({ req, res, resolvedUrl }) {
  let customer_host = "https://"+req.headers.host;
  let result = await fetch(`${genuka_api_2021_10}/companies/byurl?url=${customer_host}`);
  let company = await result.json()
  result = await fetch(`${genuka_api_2021_10}/companies/${company.id}/collections`);
  let collections = await result.json()
  console.log(collections)

  return {
    props: {
      company,collections
    }, 
  }
}
export default function Home({ company, collections = [] }) {
  
  let pagination;
  if (!company) return <EmptyStore />;
  console.log(collections)
  return (
    <Main company={company}>
      <SectionContainer>
        <DesignedTitle>Collections</DesignedTitle>
        <CollectionDescription>Découvrez toutes nos collections</CollectionDescription>
        <CollectionListContainer className="row">
          {collections.data.map((collection) => {
            return <CollectionCard className="col-lg-4 col-md-6" key={collection.id || Math.random()} collection={collection} />;
          })}
        </CollectionListContainer>
        <Pagination pagination={{...collections.meta, ...collections.links}} />
      </SectionContainer>
    </Main>
  );
}
