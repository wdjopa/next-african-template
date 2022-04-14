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

  const { per_page = 9, page = 1 } = query;
  result = await fetch(`https://api.genuka.com/2021-10/companies/${company.id}/collections?per_page=${per_page}&page=${page}`);
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
    <Main
      company={company}
      head={
        <>
          <title>{company.name} | Collections - check out our collections</title>
          <meta name="description" content={company.description} />
          <meta name="keywords" content={company?.description?.split(" ").join(", ")} />
          <meta name="author" content={company.name} />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content={company.name} />
          <meta name="msapplication-TileColor" content="#222" />
          <meta name="msapplication-TileImage" content={company.logo} />
          <meta name="theme-color" content="#222" />
          <meta property="og:title" content={company.name} />
          <meta property="og:description" content={company.description} />
          <meta property="og:image" content={company.logo} />
          <meta property="og:url" content={company.website} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={company.name} />
        </>
      }
    >
      <SectionContainer>
        <DesignedTitle>Collections</DesignedTitle>
        <CollectionDescription>Découvrez toutes nos collections</CollectionDescription>
        <CollectionListContainer className="row">
          {collections.data.map((collection) => {
            return <CollectionCard className="col-lg-4 col-md-6" key={collection.id || Math.random()} collection={collection} company_logo={company.logo} />;
          })}
        </CollectionListContainer>
        <Pagination pagination={{ ...collections.links, ...collections.meta }} />
      </SectionContainer>
    </Main>
  );
}
