import React from "react";
import styledComponents from "styled-components";
import UserIcon from "../icons/UserIcon";

const Container = styledComponents.div`
    ${(props) => (props.mobile ? "" : "margin-left: 1rem;")}

`;

const ActionIcon = styledComponents.div`
    cursor: pointer;
    padding: 5px 10px;
`;
function AccountHeader(props) {
  const { mobile } = props;
  return (
    <Container mobile={mobile}>
      <ActionIcon>
        <UserIcon width={"20"} height={"20"} size={512} />
      </ActionIcon>
    </Container>
  );
}

export default AccountHeader;
