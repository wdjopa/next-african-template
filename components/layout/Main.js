/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Announcement from "./Announcement";
import { loginWithToken, useGenukaDispatch, useGenukaState } from "../../store/genukaStore";
import Notifications from "../common/Notifications";

function Main({ company, children, head }) {
  const dispatch = useGenukaDispatch();
  const { notifications } = useGenukaState();
  const [globalStyle, setGlobalStyle] = React.useState({ "--main-color": "black", "--primary-color": "green", "--secondary-color": "red", "--main-font": "josefin sans" });

  useEffect(() => {
    setGlobalStyle({ ...globalStyle, "--primary-color": "#348989", "--secondary-color": "#D31B51" });
    dispatch({ type: "company", payload: company });
    loginWithToken(dispatch);
  }, [company]);

  return (
    <div style={globalStyle}>
      <Head>
        {head ? (
          head
        ) : (
          <>
            <title>
              {company.name} - {company.description}
            </title>
            <link rel="favicon" href={company.logo} />
            <link rel="icon" href={company.logo} />
            
          </>
        )}
      </Head>
      {/* <Announcement text={"Livraison offerte à partir de 50.000 FCFA d'achat. Jusqu'au 30/02/2022"} visible={true} /> */}
      <Header company={company} />
      <div className="container">{children}</div>

      <Notifications notifications={notifications} />
      <Footer company={company} />
    </div>
  );
}

export default Main;
