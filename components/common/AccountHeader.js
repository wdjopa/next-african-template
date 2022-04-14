import React from "react";
import styledComponents from "styled-components";
import UserIcon from "../icons/UserIcon";
import Link from "next/link";
import { useGenukaState } from "../../store/genukaStore";
const Container = styledComponents.div`
    ${(props) => (props.mobile ? "" : "margin-left: 1rem;")}

`;

const ActionIcon = styledComponents.div`
    cursor: pointer;
    padding: 5px 10px;
`;
function AccountHeader(props) {
  const { mobile } = props;
  const { user } = useGenukaState();
  return (
    <Container mobile={mobile}>
      <Link href="/account" passHref>
        <div style={{display: "flex",alignItems:"end", cursor :"pointer"}}>
          {!mobile && user && "Hello " + user.first_name}
          <ActionIcon>
            <UserIcon width={"20"} height={"20"} style={{ marginLeft: "1rem" }} size={512} />
          </ActionIcon>
        </div>
      </Link>
    </Container>
  );
}

export default AccountHeader;
