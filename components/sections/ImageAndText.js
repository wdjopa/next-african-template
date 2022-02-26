import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import DesignedButton from "../common/DesignedButton";
import SectionContainer from "./SectionContainer";

const Title = styledComponents.h2`
    margin-bottom: .5rem;
    font-size: 2.5rem;
`;
const Subtitle = styledComponents.h4`
    margin-bottom: 1rem;
    font-family: "Open Sans", sans-serif !important;
    color: var(--secondary-color);
`;
const Paragraph = styledComponents.p`
    margin: 1rem 0;
    margin-bottom:2rem;
    font-family: "Open Sans", sans-serif !important;
`;

const RoundedImage = styledComponents.img`
    width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 10px;
`;

function ImageAndText({ datas }) {
  const { image_first, button, title, subtitle, paragraph, image } = datas;
  return (
    <SectionContainer className="row" style={{ display: "flex", alignItems: "center" }}>
      {image_first && (
        <div className="col-md-6 mt-5">
          <RoundedImage src={image.url} alt={image.alt} />
        </div>
      )}
      <div className="col-md-6 mt-5">
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Paragraph>{paragraph}</Paragraph>
        <a href={button.link}>
          <DesignedButton>{button.text}</DesignedButton>
        </a>
      </div>
      {!image_first && (
        <div className="col-md-6 mt-5">
          <RoundedImage src={image.url} alt={image.alt} />
        </div>
      )}
    </SectionContainer>
  );
}

export default ImageAndText;
