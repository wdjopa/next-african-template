import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import DesignedButton from "../common/DesignedButton";
import SectionContainer from "./SectionContainer";

const Title = styledComponents.h2`
    margin-bottom: 1rem;
    font-size: 2.5rem;

`;

const Paragraph = styledComponents.p`
    margin: 2rem;
    font-family: "Open Sans", sans-serif !important;
`;

function TextAndButton({ datas }) {
  const { title, paragraph, button } = datas;
  return (
    <SectionContainer style={{ textAlign: "center" }}>
      <Title>{title}</Title>
      <Paragraph>{paragraph}</Paragraph>
      <a href={button.link}>
        <DesignedButton>{button.text}</DesignedButton>
      </a>
    </SectionContainer>
  );
}

export default TextAndButton;
