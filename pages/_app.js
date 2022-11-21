import Head from "next/head";
import { Provider } from "react-redux";
import { ConfigProvider, theme } from "antd";

import store from "@/store";

import Layout from "@/components/Layout";
// import "antd/dist/antd.css";
import "@/styles/style.scss";

const { darkAlgorithm, compactAlgorithm } = theme;

function MyApp({ Component, pageProps }) {
  const t = {
    algorithm: [darkAlgorithm, compactAlgorithm],
  };

  return (
    <Provider store={store}>
      <Head>
        <title>前端實驗室</title>
        <meta name="description" content="前端實驗室" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConfigProvider theme={t}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </Provider>
  );
}

export default MyApp;
