import React from "react";
import styledComponents from "styled-components";
import Plus from "../icons/Plus";

const Overlay = styledComponents.div`
    position: fixed;
    cursor: pointer;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #555555CC;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;

    transition: all .13s ease-in;

`;
const ModalContainer = styledComponents.div`
    min-height: 40%;
    max-height: 80%;
    width: 40%;
    cursor: default;
    position: relative;
    
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 4px;
    background-color: white;

    box-shadow: 0 0 20px 0 #888;

    @media (max-width: 600px) {
        & {
            width: 90%;
        }
    }

`;

export const ZigZag = styledComponents.div`
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 20px;
    box-sizing: border-box;
    background-repeat-y: no-repeat !important;
    background: url('/zigzag.svg');
`;

const Title = styledComponents.div`
    font-size: 2rem;
    text-align: left;
    font-family: var(--main-font);
`;

export const ActionIcon = styledComponents.div`
    width: 2rem;
    height: 2rem;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;

    &:hover{
        background: #EEEEEE88;
    }
`;
const ModalHeader = styledComponents.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    padding-bottom: 1.5rem;
    
`;
const ModalBody = styledComponents.div`
    padding: 2rem;
`;
const ModalFooter = styledComponents.div`
    padding: 2rem;
`;

function Modal(props) {
  const { isVisible, setIsVisible } = props;

  return (
    <Overlay
      style={{ transform: isVisible ? "scale(1)" : "scale(0)" }}
      onClick={() => {
        setIsVisible(false);
      }}
    >
      <ModalContainer {...props} onClick={(e)=>{
          e.stopPropagation()
      }}>
        <ModalHeader>
          <Title>{props.title}</Title>
          <ZigZag />
          <ActionIcon
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            <Plus style={{ transform: "rotate(45deg)" }} />
          </ActionIcon>
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        {props.footer && <ModalFooter>{props.footer}F</ModalFooter>}
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;
