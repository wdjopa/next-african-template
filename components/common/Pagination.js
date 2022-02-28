import React from "react";
import styledComponents from "styled-components";
import Arrow from "../icons/Arrow";

const Container = styledComponents.div`
    margin: 1rem;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
`;


const PreviousArrow = styledComponents(Arrow)`
    transform : rotate(180deg);
    width: 15px;
`;

const NextArrow = styledComponents(Arrow)`
    width: 15px;
`;

const RoundedPageNumber = styledComponents.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: ${(props) => (props.active ? "#333" : "#EEE")};
    color: ${(props) => (props.active ? "white" : "#000")};
    font-weight: ${(props) => (props.active ? "600" : "200")};
    font-family: "Open Sans";
    margin:  5px;

`;

function Pagination() {
  return (
    <Container>
      <RoundedPageNumber>
        <PreviousArrow />
      </RoundedPageNumber>
      <RoundedPageNumber active={true}>1</RoundedPageNumber>
      <RoundedPageNumber>2</RoundedPageNumber>

      <RoundedPageNumber>...</RoundedPageNumber>
      <RoundedPageNumber>45</RoundedPageNumber>
      <RoundedPageNumber>
        <NextArrow />
      </RoundedPageNumber>
    </Container>
  );
}

export default Pagination;
