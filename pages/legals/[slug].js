import React from "react";
import EmptyStore from "../../components/EmptyStore";
import Main from "../../components/layout/Main";
import styledComponents from "styled-components";
import SectionContainer from "../../components/sections/SectionContainer";
import DesignedTitle from "../../components/common/DesignedTitle";
import Router  from "next/router";

const Center = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5rem 0;
`;

const TextContent = styledComponents.div``;

function LegalPage({ company, article }) {

  if (!company) return <EmptyStore />;
  if (!article) {
    Router.push("/404")
    return <EmptyStore />;
  }
  return (
    <Main
      company={company}
      head={
        <>
          <title>
            {article.name} - {article.text.replace(/<[^>]*>?/gm, "").substring(0, 100)} | {company.name}
          </title>
            <link rel="favicon" href={company.logo} />
            <link rel="icon" href={company.logo} />
          <meta name="author" content={company.name} />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content={article.name} />
          <meta name="msapplication-TileColor" content="#222" />
          <meta name="msapplication-TileImage" content={article.medias.length > 0 ? article.medias[0].link : company.logo} />
          <meta name="theme-color" content="#222" />
          <meta property="og:title" content={article.name} />
          <meta property="og:description" content={article.text.replace(/<[^>]*>?/gm, "").substring(0, 100)} />
          <meta property="og:image" content={article.medias.length > 0 ? article.medias[0].link : company.logo} />
          <meta property="og:url" content={company.website + "/products/" + product.slug} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content={article.name} />
        </>
      }
    >
      <SectionContainer>
        <Center>
          <DesignedTitle>{article.title}</DesignedTitle>
        </Center>
        <TextContent dangerouslySetInnerHTML={{ __html: article.text }}></TextContent>
      </SectionContainer>
    </Main>
  );
}

export async function getServerSideProps(context) {
  let company, company_url, article;
  const { req, query, res, asPath, pathname } = context;
  company_url = "https://" + req.headers.host;
  try {
    let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
    company = await result.json();
    result = await fetch(`https://api.genuka.com/2021-10/companies/${company.id}/blogs/by_slug/${query.slug}`);
    article = await result.json();
    if (!company || !company.template || !article) {
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
        props: {},
      };
    }

    return {
      props: {
        company,
        article,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
}

export default LegalPage;
