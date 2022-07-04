import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/store";

import Layout from "@/components/Layout";
// import "antd/dist/antd.css";
import "@/styles/style.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>前端實驗室</title>
        <meta name="description" content="前端實驗室" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
