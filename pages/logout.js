import React from "react";
import { useGenukaDispatch, useGenukaState } from "../store/genukaStore";
import styledComponents from "styled-components";
import router from "next/router";

const Center = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
    flex-direction: column;
    width: 50%;

    @media (max-width: 600px) {
        & {
            width: 90%;
        }
    }
`;
function LogoutPage() {
  const dispatch = useGenukaDispatch();
  const { isLogged } = useGenukaState();
  React.useEffect(() => {
    dispatch({ type: "logout" });
  }, []);

  React.useEffect(() => {
    if (!isLogged) router.push("/");
  }, [isLogged]);
  
  return <Center>Logout ...</Center>;
}

export default LogoutPage;
