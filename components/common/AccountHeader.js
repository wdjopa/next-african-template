import React from "react";
import styledComponents from "styled-components";
import UserIcon from "../icons/UserIcon";

const Container = styledComponents.div`
    margin-left: 1rem;
`;

const ActionIcon = styledComponents.div`
    cursor: pointer;
    padding: 5px 10px;
`;
function AccountHeader() {
  return (
    <Container>
      <ActionIcon>
        <UserIcon />
      </ActionIcon>
    </Container>
  );
}

export default AccountHeader;
