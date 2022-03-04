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

export async function getServerSideProps(context) {
  let company, collections, company_url;
  const { req, query, res, asPath, pathname } = context;

  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  result = await fetch(`https://api.genuka.com/2021-10/companies/${company.id}/collections`);
  collections = await result.json();

  return {
    props: {
      company,
      collections,
    }, // will be passed to the page component as props
  };
}

export default function Home({ company, collections = [] }) {
 
  let pagination;
  if (!company) return <EmptyStore />;

  return (
    <Main company={company}>
      <SectionContainer>
        <DesignedTitle>Collections</DesignedTitle>
        <CollectionDescription>Découvrez toutes nos collections</CollectionDescription>
        <CollectionListContainer className="row">
          {collections.data.map((collection) => {
            return <CollectionCard className="col-lg-4 col-md-6" key={collection.id || Math.random()} collection={collection} company_logo={company.logo}/>;
          })}
        </CollectionListContainer>
        <Pagination pagination={pagination} />
      </SectionContainer>
    </Main>
  );
}
