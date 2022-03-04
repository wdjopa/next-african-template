import EmptyStore from "../components/EmptyStore";
import Main from "../components/layout/Main";
import FeaturedCollection from "../components/sections/FeaturedCollection";
import FeaturedProduct from "../components/sections/FeaturedProduct";
import Hero from "../components/sections/Hero";
import ImageAndText from "../components/sections/ImageAndText";
import TextAndButton from "../components/sections/TextAndButton";

export async function getServerSideProps(context) {
  let company, company_url;
  const { req, query, res, asPath, pathname } = context;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  return {
    props: {
      company,
      template: company.template,
    },
  };
}

export default function Home({ template, company }) {
  if (!company) return <EmptyStore />;

  return (
    <Main company={company}>
      {template.map((section) => {
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
