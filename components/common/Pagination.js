import Link from "next/link";
import { useRouter } from "next/router";
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

function Pagination({ pagination }) {
  const router = useRouter();
  if (pagination.current_page === pagination.last_page && pagination.last_page === pagination.from) return <></>;
  return (
    <Container>
      <Link passHref href={pagination.prev != null ? router.pathname + "?per_page=" + pagination.per_page + "&page=" + (parseInt(pagination.current_page) - 1) : "#"}>
        <RoundedPageNumber>
          <PreviousArrow />
        </RoundedPageNumber>
      </Link>
      {new Array(pagination.last_page).fill().map((_, i) => {
        let ind = i + 1;
        return (
          <Link href={router.pathname + "?per_page=" + pagination.per_page + "&page=" + ind} passHref key={Math.random()}>
            <RoundedPageNumber key={"page_" + ind} active={ind === pagination.current_page}>
              {ind}
            </RoundedPageNumber>
          </Link>
        );
      })}
      {/* <RoundedPageNumber>...</RoundedPageNumber>
      <RoundedPageNumber>45</RoundedPageNumber> */}

      <Link passHref href={pagination.next != null ? router.pathname + "?per_page=" + pagination.per_page + "&page=" + (parseInt(pagination.current_page) + 1) : "#"}>
        <RoundedPageNumber>
          <NextArrow />
        </RoundedPageNumber>
      </Link>
    </Container>
  );
}

export default Pagination;
