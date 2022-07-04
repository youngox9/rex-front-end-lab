import { useEffect, useState } from "react";
import CodeArea from "@/components/CodeArea";
import _ from "lodash";
import TagManager from "react-gtm-module";
import { useRouter } from "next/router";
import { Card, Space, Row, Col, Input, Button } from "antd";

const INIT_CONFIG = {
  gaId: "UA-118980614-2",
  pageview: "",
  category: "",
  action: "click",
  label: "",
  event: "event",
};

export default function Gtm() {
  const [config, setConfig] = useState(INIT_CONFIG);
  const router = useRouter();
  const { pathname } = router;

  const {
    gtmId = "",
    gaId = "",
    pageview = "",
    category = "",
    action = "",
    label = "",
    event = "",
    pageviewTitle = "",
    gtmPageviewTitle = "",
    gtmPageview = "",
  } = config;

  useEffect(() => {
    const historyConfig = JSON.parse(localStorage.getItem(pathname)) || {};
    if (historyConfig?.gaId) {
      onInitGtmId(historyConfig.gaId);
    }
    setConfig(historyConfig);
  }, []);

  function onInitGtmId() {
    TagManager.initialize({
      gtmId,
    });
  }

  function onChangeConfig(key, value) {
    const clone = { ...config };
    const temp = _.set(clone, key, value);
    setConfig(temp);
    localStorage.setItem(pathname, JSON.stringify(temp));
  }

  function sendGtmPageView() {
    if (typeof dataLayer !== "undefined") {
      dataLayer.push({
        event: "VirtualPageview",
        virtualPageTitle: gtmPageviewTitle,
        virtualPageURL: gtmPageview,
      });
    }
  }

  const gtmCode = ` 
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', '${gtmId}');
`.trim();

  const gtmPageviewCode = ` 
  dataLayer.push({
    event: "VirtualPageview",
    virtualPageTitle:'${gtmPageviewTitle}',
    virtualPageURL: '${gtmPageview}',
  });
`.trim();

  const eventDisabled = !gaId || !action || !category || !label || !event;

  return (
    <>
      <h2 className="title">
        <img className="icon" src="/ga-logo.svg" />
        Google Analytics
      </h2>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        {/* GTM */}
        <Col span={24} md={8}>
          <Card title="GTM" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="GTM ID"
                style={{ width: "100%" }}
                value={config.gtmId}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("gtmId", val);
                }}
              />
              <Button
                type="primary"
                onClick={onInitGtmId}
                block
                disabled={!gtmId}
              >
                Submit GTM ID
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={24} md={16}>
          <Card bordered={false}>
            <CodeArea text={gtmCode} />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card title="GTM" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="網頁標題"
                style={{ width: "100%" }}
                value={gtmPageviewTitle}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("gtmPageviewTitle", val);
                }}
              />
              <Input
                placeholder="網頁路徑"
                style={{ width: "100%" }}
                value={gtmPageview}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("gtmPageview", val);
                }}
              />
              <Button type="primary" onClick={sendGtmPageView} block>
                Pageview
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={24} md={16}>
          <Card bordered={false}>
            <CodeArea text={gtmPageviewCode} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
