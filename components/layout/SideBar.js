import React from "react";
import styledComponents from "styled-components";
import Divider from "../common/Divider";
import Menu from "../common/Menu";
import SocialIcons from "../common/SocialIcons";
import MenuIcon from "../icons/MenuIcon";
import Plus from "../icons/Plus";
import { Copyright } from "./Footer";

const ActionIcon = styledComponents.div`
    width: 2rem;
    height: 2rem;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styledComponents.img`
    height: 80px;
    min-width: 50px;
    border-radius: 100%;
`;

const DrawerContainer = styledComponents.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    background: white;
    box-sizing:border-box;
`;
const Content = styledComponents.div`
    padding: 1rem;
    box-sizing:border-box;
    position: relative;
    width: 100%;
    overflow-x:hidden;
`;
const Header = styledComponents.div`
    box-sizing:border-box;
    color: white;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid #EEE;
`;
const CompanyName = styledComponents.h3`
    color: gray;
    font-size: 1rem;
    margin-left: 1rem;
    margin-bottom:0;
`;

function Drawer({ company, onClose }) {
  return (
    <DrawerContainer>
      <Content>
        <Header>
          <div className="d-flex align-items-center">
            <Logo style={{ height: "50px" }} src={company.logo} alt={"Logo de " + company.name} />
            <CompanyName>{company.name}</CompanyName>
          </div>
          <ActionIcon onClick={onClose}>
            <Plus style={{ transform: "rotate(45deg)" }} />
          </ActionIcon>
        </Header>
        <Menu isMobile={true} />
        <SocialIcons />
        <Divider />
        <Copyright />
      </Content>
    </DrawerContainer>
  );
}

function SideBar({ company }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <div>
      <ActionIcon
        onClick={() => {
          setIsMenuOpen(true);
        }}
      >
        <MenuIcon />
      </ActionIcon>
      {isMenuOpen && (
        <Drawer
          company={company}
          onClose={() => {
            setIsMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default SideBar;
