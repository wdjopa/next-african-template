import React from "react";
import { useGenukaDispatch, useGenukaState } from "../store/genukaStore";
import router from "next/router";

function LogoutPage() {
  const dispatch = useGenukaDispatch();
  const { isLogged } = useGenukaState();
  React.useEffect(() => {
    dispatch({ type: "logout" });
  }, []);

  React.useEffect(() => {
    if (!isLogged) router.push("/");
  }, [isLogged]);
  
  return <div>logout ...</div>;
}

export default LogoutPage;
