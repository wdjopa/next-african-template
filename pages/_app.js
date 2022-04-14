import { GenukaProvider } from "../store/genukaStore";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/main.css";
import "../styles/mediaqueries.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <GenukaProvider>
      <NextNProgress />
      <Component {...pageProps} />
    </GenukaProvider>
  );
}

export default MyApp;
