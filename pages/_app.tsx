import "../styles/globals.css";
import type { AppProps } from "next/app";
import WithAppolo from "../service/WithApollo";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WithAppolo>
      <Component {...pageProps} />
    </WithAppolo>
  );
}

export default MyApp;
