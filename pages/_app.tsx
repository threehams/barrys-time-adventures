import { setAutoFreeze } from "immer";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../styles/global.css";

setAutoFreeze(false);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&family=Open+Sans:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}

export default MyApp;
