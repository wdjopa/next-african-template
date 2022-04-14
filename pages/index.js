import EmptyStore from "../components/EmptyStore";
import Main from "../components/layout/Main";
import FeaturedCollection from "../components/sections/FeaturedCollection";
import FeaturedProduct from "../components/sections/FeaturedProduct";
import Hero from "../components/sections/Hero";
import ImageAndText from "../components/sections/ImageAndText";
import TextAndButton from "../components/sections/TextAndButton";

export async function getServerSideProps(context) {
  let company, company_url, template;
  const { req, query, res, asPath, pathname } = context;
  company_url = "https://" + req.headers.host;
  try {
    let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
    company = await result.json();
    if (company != null && company.template) {
      template = company.template;
    } else {
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
        template,
      },
    };
  } catch (error) {
    console.log("Error > ", error);
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
}

export default function Home({ template, company }) {
  if (!company) return <EmptyStore />;

  return (
    <Main
      company={company}
      head={
        <>
          <title>
            {company.name} - {company.description}
          </title>
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
      {template &&
        template.map((section) => {
          switch (section.slug) {
            case "text-and-button":
              return <TextAndButton datas={section.value} />;
            case "image-and-text":
              return <ImageAndText datas={section.value} />;
            case "featured-collection":
              return <FeaturedCollection collection_id={section.value} currencySymbol={company.currency.symbol} company_id={company.id} />;
            case "featured-product":
              return <FeaturedProduct product_id={section.value} currencySymbol={company.currency.symbol} />;
            case "hero":
              return <Hero heroes={section.value} />;
            default:
              <>...</>;
              break;
          }
        })}
    </Main>
  );
}
