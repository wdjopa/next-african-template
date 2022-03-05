import React from "react";
import { useGenukaDispatch, useGenukaState } from "../store/genukaStore";
import Router from "next/router";

function LogoutPage({ company }) {
  const dispatch = useGenukaDispatch();
  const { isLogged } = useGenukaState();
  React.useEffect(() => {
    dispatch({ type: "logout" });
  }, []);
  if (!isLogged) Router.push("/");
  return <div>logout ...</div>;
}

export default LogoutPage;
