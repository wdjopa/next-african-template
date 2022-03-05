import Link from "next/link";
import styledComponents from "styled-components";
import DesignedButton from "../components/common/DesignedButton";
import DesignedTitle from "../components/common/DesignedTitle";
import Divider from "../components/common/Divider";
import { Copyright } from "../components/layout/Footer";
import SectionContainer from "../components/sections/SectionContainer";

const Center = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15rem 0;
    flex-direction: column;
`;
function Custom404({}) {
  return (
    <SectionContainer>
      <Center>
        <DesignedTitle>404 - Page not found</DesignedTitle>
        <br />
        <br />
        <Link href="/" passHref>
          <DesignedButton>Back to home</DesignedButton>
        </Link>
      </Center>
      <Divider />
      <div style={{ textAlign: "center" }}>
        <Copyright />
      </div>
    </SectionContainer>
  );
}

export default Custom404;
