import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import DesignedButton from "../common/DesignedButton";

const Container = styledComponents.div`
    // margin: 2rem 0;
    display: flex;
    box-sizing:border-box;
    justify-content:space-between;
`;
const BlocContainer = styledComponents.div`
    box-sizing:border-box;
    display: flex;
    flex-direction: column;
    justify-content:center;
   margin: 2rem 0;
    ${(props) => (props.disposition === "up" ? " padding-right: 2% " : "padding-left: 2% ")};
`;

const RoundedImage = styledComponents.img`
    width: 100%;
    max-height: 80vh;
    object-fit: cover;
    border-radius: 10px;
`;

const Title = styledComponents.h3`
    margin-bottom: 1rem;
    font-size: 2.5rem;
`;
const Paragraph = styledComponents.p`
    margin-bottom: 2rem;
    font-family:  "Open Sans", sans-serif !important;
`;

const ImageAndAction = ({ disposition = "up", image, title, paragraph, button }) => {
  return (
    <BlocContainer disposition={disposition} className="col-md-6">
      {disposition === "up" && <RoundedImage src={image.url} alt={image.alt} style={{ marginBottom: "2rem" }} onError={() => {}} />}
      <Title>{title}</Title>
      <Paragraph>{paragraph}</Paragraph>
      <a href={button.link}>
        <DesignedButton style={{ width: "100%" }}>{button.text}</DesignedButton>
      </a>
      {disposition !== "up" && <RoundedImage src={image.url} alt={image.alt} style={{ marginTop: "2rem" }} onError={() => {}} />}
    </BlocContainer>
  );
};

function Hero({ heroes }) {
  return (
    <Container className="row">
      {heroes.map((h) => {
        return <ImageAndAction key={h.id || Math.random()} disposition={h.disposition || "up"} title={h.title} paragraph={h.paragraph} button={h.button} image={h.image} />;
      })}
    </Container>
  );
}

export default Hero;
