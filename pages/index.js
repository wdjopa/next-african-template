import EmptyStore from "../components/EmptyStore";
import Main from "../components/layout/Main";
import FeaturedCollection from "../components/sections/FeaturedCollection";
import FeaturedProduct from "../components/sections/FeaturedProduct";
import Hero from "../components/sections/Hero";
import ImageAndText from "../components/sections/ImageAndText";
import TextAndButton from "../components/sections/TextAndButton";
import { genuka_api_2021_10 } from "../utils/configs";

export async function getServerSideProps(context) {
  let company, company_url;
  const { req, query, res, asPath, pathname } = context;
  company_url = "https://" + req.headers.host;
  let result = await fetch(`https://api.genuka.com/2021-10/companies/byurl?url=${company_url}`);
  company = await result.json();

  // let template = [
  //   {
  //     slug: "hero",
  //     value: [
  //       {
  //         disposition: "up",
  //         title: "MATANGA Shoes",
  //         paragraph: "Et si on vous disait que vous n'avez plus le droit de vous chausser par défaut ? Nous sommes la meilleure alternative",
  //         button: {
  //           text: "Start shopping now",
  //           link: "/products",
  //         },
  //         image: {
  //           url: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5579/155187174_802463503946440_5538153164449173310_n.jpg",
  //           alt: "Et si on vous disait que vous n'avez plus le droit de vous chausser par défaut ? Nous sommes la meilleure alternative",
  //         },
  //       },
  //       {
  //         disposition: "down",
  //         title: "MATANGA Shoes",
  //         paragraph: "Sometimes we make them just for eyes not for feet",
  //         button: {
  //           text: "Start shopping now",
  //           link: "/products",
  //         },
  //         image: {
  //           url: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5578/150019602_803202313876868_1699266300643458422_n.jpg",
  //           alt: "Sometimes we make them just for eyes not for feet",
  //         },
  //       },
  //     ],
  //   },

  //   {
  //     slug: "featured-product",
  //     value: 4350,
  //   },

  //   {
  //     slug: "featured-collection",
  //     value: 238,
  //   },

  //   {
  //     slug: "image-and-text",
  //     value: {
  //       image_first: false,
  //       image: {
  //         url: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5577/122597167_924226787985107_8132469846152227844_n.jpg",
  //         alt: "Image de la collection SHAKA",
  //       },
  //       title: "Nouvelle collection SHAKA",
  //       subtitle: "Découvrez la collection Shaka 2020",
  //       paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vestibulum, lacus eget consequat mollis, felis.",
  //       button: {
  //         link: "/collections/2",
  //         text: "Découvrir la collection",
  //       },
  //     },
  //   },

  //   {
  //     slug: "text-and-button",
  //     value: {
  //       title: "Learn more about us",
  //       paragraph: "Donec metus turpis, viverra sit amet facilisis eget, elementum vel ligula. Morbi posuere metus non neque pharetra, a egestas diam scelerisque",
  //       button: {
  //         link: "https://market.lamater.net",
  //         text: "GET IN TOUCH",
  //       },
  //     },
  //   },

  //   {
  //     slug: "featured-product",
  //     value: 4355,
  //   },
  // ];

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
