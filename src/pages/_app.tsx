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
        {/* <style>
          @import url('')
        </style> */}
        <title>Mathmatics Initiatives in Nepal</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
