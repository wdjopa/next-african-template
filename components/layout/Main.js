/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Announcement from "./Announcement";
import { useGenukaDispatch } from "../../store/genukaStore";


function Main({ company, children, head }) {
  const dispatch = useGenukaDispatch();
  const [globalStyle, setGlobalStyle] = React.useState({ "--main-color": "black", "--primary-color": "green", "--secondary-color": "red", "--main-font": "josefin sans" })
  useEffect(() => {
    if (company) {
      dispatch({ type: "company", payload: company });
      
      setGlobalStyle({...globalStyle, "--primary-color" :  "#348989", "--secondary-color" :  "#D31B51"});
    }
  }, [company]);


  return (
    <div style={globalStyle}>
      <Head>{head ? head : <title>Home</title>}</Head>
      <Announcement text={"Livraison offert à partir de 50.000 FCFA d'achat. Jusqu'au 30/02/2022"} visible={true} />
      <Header company={company} />
      <div className="container">{children}</div>
      <Footer company={company} />
    </div>
  );
}

export default Main;
