import React from "react";
import styledComponents from "styled-components";
import Minus from "../icons/Minus";
import Plus from "../icons/Plus";

const Container = styledComponents.div``;

const Header = styledComponents.div`
    border-bottom: 1px solid black;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
`;

const Title = styledComponents.h5`
    text-transform : uppercase;
`;

const ActionButton = styledComponents.div`
    font-size: 4rem;
    font-weight: 200;
    line-height: 0.5;
    cursor: pointer;
    width: 5rem;
    height: 2rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;

`;

const Content = styledComponents.div``;

function Accordion(props) {
  const { title, children } = props;
  const [showContent, setShowContent] = React.useState(true);
  return (
    <Container {...props}>
      <Header>
        <Title>{title}</Title>
        <ActionButton
          onClick={() => {
            setShowContent(!showContent);
          }}
        >
          {showContent ? <Minus/> : <Plus/>}
        </ActionButton>
      </Header>
      {showContent && <Content>{children}</Content>}
    </Container>
  );
}

export default Accordion;
