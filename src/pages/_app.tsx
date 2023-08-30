import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Head from "next/head";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

//for redeploy


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <title>Mathmatics Initiatives in Nepal</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
