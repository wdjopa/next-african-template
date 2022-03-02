import EmptyStore from "../components/EmptyStore";
import Main from "../components/layout/Main";
import FeaturedCollection from "../components/sections/FeaturedCollection";
import FeaturedProduct from "../components/sections/FeaturedProduct";
import Hero from "../components/sections/Hero";
import ImageAndText from "../components/sections/ImageAndText";
import TextAndButton from "../components/sections/TextAndButton";
import { genuka_api_2021_10 } from "../utils/configs";


export async function getServerSideProps({ req, res, resolvedUrl }) {
  let customer_host = "https://"+req.headers.host;
  let result = await fetch(`${genuka_api_2021_10}/companies/byurl?url=${customer_host}`);
  let company = await result.json()

  result  = await fetch(`${genuka_api_2021_10}/companies/${company.id}/collections/238`);
  let collection = await result.json()

  result  = await fetch(`${genuka_api_2021_10}/companies/${company.id}/products/slug/bears-and-sneakers-488`);
  let product = await result.json()

  

  return {
    props: {
      company, collection,product
    }, 
  }
}
export default function Home({ company, collection, product }) {

  if (!company) return <EmptyStore />;

  const heroes = [
    {
      disposition: "up",
      title: "MATANGA Shoes",
      paragraph: "Et si on vous disait que vous n'avez plus le droit de vous chausser par défaut ? Nous sommes la meilleure alternative",
      button: {
        text: "Start shopping now",
        link: "/collections/all",
      },
      image: {
        url: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5579/155187174_802463503946440_5538153164449173310_n.jpg",
        alt: "Et si on vous disait que vous n'avez plus le droit de vous chausser par défaut ? Nous sommes la meilleure alternative",
      },
    },
    {
      disposition: "down",
      title: "MATANGA Shoes",
      paragraph: "Sometimes we make them just for eyes not for feet",
      button: {
        text: "Start shopping now",
        link: "/collections/all",
      },
      image: {
        url: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5578/150019602_803202313876868_1699266300643458422_n.jpg",
        alt: "Sometimes we make them just for eyes not for feet",
      },
    },
  ];

  const text_and_button = {
    title: "Learn more about us",
    paragraph: "Donec metus turpis, viverra sit amet facilisis eget, elementum vel ligula. Morbi posuere metus non neque pharetra, a egestas diam scelerisque",
    button: {
      link: "https://market.lamater.net",
      text: "GET IN TOUCH",
    },
  };

  const image_and_text = {
    image_first: false,
    image: {
      url: "https://bucket-my-store.s3.eu-west-3.amazonaws.com/5577/122597167_924226787985107_8132469846152227844_n.jpg",
      alt: "Image de la collection SHAKA",
    },
    title: "Nouvelle collection SHAKA",
    subtitle: "Découvrez la collection Shaka 2020",
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vestibulum, lacus eget consequat mollis, felis.",
    button: {
      link: "/collections/2",
      text: "Découvrir la collection",
    },
  };


  return (
    <Main company={company}>
      {/* <ImageAndText datas={{...image_and_text, image_first: true}} /> */}
      <Hero heroes={heroes} />
      <FeaturedCollection collection={collection} currency={company.currency.symbol}/>
      <ImageAndText  datas={image_and_text} />
      <FeaturedProduct product={product}   currency={company.currency.symbol}/>
      <TextAndButton datas={text_and_button} />
    </Main>
  );
}
