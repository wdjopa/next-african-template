import { GenukaProvider } from "../store/genukaStore";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/main.css";
import "../styles/mediaqueries.css";

function MyApp({ Component, pageProps }) {
  return (
    <GenukaProvider>
      <Component {...pageProps} />
    </GenukaProvider>
  );
}

export default MyApp;
