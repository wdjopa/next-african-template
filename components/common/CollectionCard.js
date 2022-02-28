import Link from "next/link";
import React from "react";
import styledComponents from "styled-components";
import Arrow from "../icons/Arrow";

const CollectionCardContainer = styledComponents.div`
    border-radius: 4px;
    box-shadow: 0 2px 4px #00000022;
    height: auto;
    cursor: pointer;
`;

const ImageContainer = styledComponents.div`
    width: 100%; 
    height: 40vh;
    overflow: hidden;
`;

const Image = styledComponents.img`
  object-fit: cover;
  object-position: center center;

  width: 100%; 
  height: 100%; 

`;
const CollectionName = styledComponents.h5`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 1rem;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
    

function CollectionCard(props) {
  const { collection } = props;
  return (
    <div {...props} style={{ padding: "1rem", boxSizing: "border-box" }}>
      <Link href={"/collections/1"} passHref>
        <CollectionCardContainer>
          <ImageContainer>
            <Image src={collection} alt={"Collection masai"} />
          </ImageContainer>
          <CollectionName>
            <span>MASAÏ</span>
            <Arrow />
          </CollectionName>
        </CollectionCardContainer>
      </Link>
    </div>
  );
}

export default CollectionCard;
