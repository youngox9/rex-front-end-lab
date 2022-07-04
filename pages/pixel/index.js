import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ImageModal from "@/components/ImageModal";
import CodeArea from "@/components/CodeArea";
import _ from "lodash";

import {
  Card,
  Tabs,
  message,
  Space,
  Row,
  Col,
  Divider,
  Input,
  Button,
} from "antd";
import JSONInput from "react-json-editor-ajrm";
import { useRouter } from "next/router";
// import ReactPixel from "react-facebook-pixel";

const INIT_CONFIG = {
  fbId: "",
  pageview: "",
  category: "",
  action: "aaa",
  label: "",
  event: "event",
  trackData: {
    test: "test",
  },
};

export default function Test1() {
  const [pixel, setPixel] = useState(null);
  const router = useRouter();
  const [config, setConfig] = useState(INIT_CONFIG);

  // console.log("router >>>", router);
  const { pathname } = router;

  const {
    fbId = "",
    pageview = "",
    category = "",
    action = "",
    label = "",
    event = "",
    pageviewTitle = "",
    trackData = {},
  } = config;
  //   useEffect(() => {}, [pixelId]);

  useEffect(() => {
    const historyConfig =
      JSON.parse(localStorage.getItem(pathname)) || INIT_CONFIG;

    if (historyConfig?.fbId) {
      onInitId(historyConfig.fbId);
    }
    setConfig(historyConfig);
  }, []);

  function onInitId(id = fbId) {
    const ReactPixel = require("react-facebook-pixel").default;
    setPixel(ReactPixel);
    const options = {
      autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
      debug: true, // enable logs
    };
    ReactPixel.init(id, {}, options);
    ReactPixel.pageView();
  }

  function onChangeConfig(key, value) {
    var clone = { ...config };
    const temp = _.set(clone, key, value);
    setConfig(temp);
    localStorage.setItem(pathname, JSON.stringify(temp));
  }

  function sendTrack() {
    if (pixel) {
      pixel.track("track", action, trackData);
      message.success(`Send GTAG: ${action}, ${category}, ${label}`);
    }
  }

  function sendPageView() {
    if (pixel) {
      pixel.pageView();
      message.success(`Send pageview`);
    }
  }

  const gtagInitCode = `
  <!-- Facebook Pixel Code -->
  <script>
      ! function (f, b, e, v, n, t, s) {
          if (f.fbq) return;
          n = f.fbq = function () {
              n.callMethod ?
                  n.callMethod.apply(n, arguments) : n.queue.push(arguments)
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = '2.0';
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s)
      }(window, document, 'script',
          'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${fbId}');
      fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=513951229005423&ev=PageView&noscript=1" /></noscript>
  <!-- End Facebook Pixel Code -->
  `.trim();

  const gtagCode = `
  fbq('track', '${action}', '${JSON.stringify(trackData)}'
);
    `.trim();

  const pageviewCode = ` 
gtag("config", '${fbId}', {
      page_title: '${pageviewTitle}',
      page_path: '${pageview}',
});`.trim();

  return (
    <>
      <h2 className="title">
        <img className="icon" src="/fb-icon.png" />
        Meta Pixel
      </h2>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col span={24} md={8}>
          <Card title="Pixel ID" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="enter PIXEL Code"
                value={fbId}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("fbId", val);
                }}
              />
              <Button
                type="primary"
                onClick={() => onInitId()}
                block
                disabled={!fbId}
              >
                Submit
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={24} md={16}>
          <Card bordered={false}>
            <CodeArea text={gtagInitCode} />
          </Card>
        </Col>

        <Col span={24} md={8}>
          <Card title="Pixel Event" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="enter action..."
                style={{ width: "100%" }}
                value={action}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("action", val);
                }}
              />
              {/* <Input
                placeholder="enter action..."
                style={{ width: "100%" }}
                value={action}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("action", val);
                }}
              /> */}

              <JSONInput
                id="a_unique_id"
                placeholder={trackData}
                // locale={locale}
                width="100%"
                height="150px"
                onChange={(val) => {
                  const v = val?.jsObject || {};
                  onChangeConfig("trackData", v);
                }}
              />
              <Button type="primary" onClick={sendTrack} block>
                Send Track
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={24} md={16}>
          <Card bordered={false}>
            <CodeArea text={gtagCode} />
          </Card>
        </Col>
        {/* pageview */}
        <Col span={24} md={8}>
          <Card title="GTAG Pageview" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" onClick={sendPageView} block>
                Pageview
              </Button>
            </Space>
          </Card>
        </Col>
        {/* <Col span={24} md={16}>
          <Card bordered={false}>
            <CodeArea text={pageviewCode} />
          </Card>
        </Col> */}
      </Row>
    </>
  );
}
