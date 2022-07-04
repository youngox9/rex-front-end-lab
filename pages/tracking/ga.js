import { useEffect, useState } from "react";
import CodeArea from "@/components/CodeArea";
import _ from "lodash";
import { useRouter } from "next/router";
import { Card, message, Space, Row, Col, Input, Button } from "antd";

import ReactGA from "react-ga";

const INIT_CONFIG = {
  gaId: "UA-118980614-2",
  pageview: "",
  category: "",
  event: "event",
  action: "click",
  label: "",
};

export default function GA() {
  const [config, setConfig] = useState(INIT_CONFIG);
  const router = useRouter();
  const { pathname } = router;

  const {
    gaId = "",
    pageview = "",
    category = "",
    action = "",
    label = "",
    event = "",
  } = config;

  useEffect(() => {
    const historyConfig =
      JSON.parse(localStorage.getItem(pathname)) || INIT_CONFIG;
    if (historyConfig?.gaId) {
      onInitId(historyConfig.gaId);
    }
    setConfig(historyConfig);
  }, []);

  function onChangeConfig(key, value) {
    const clone = { ...config };
    const temp = _.set(clone, key, value);
    setConfig(temp);
    localStorage.setItem(pathname, JSON.stringify(temp));
  }

  function setGtmId() {
    TagManager.initialize({
      gtmId,
    });
  }

  function onInitId(id = gaId) {
    ReactGA.initialize(id);
    ReactGA.ga("send", "pageview");
    message.success(`init GAID: ${id}`);
  }

  function send() {
    ReactGA.ga("send", event, category, action, label, 1);
    message.success(`Send GA: ${event}, ${category}, ${label}`);
  }

  function sendPageView() {
    ga("send", "pageview", pageview);
    message.success(`Send pageview: ${pageview}`);
  }

  const gtagInitCode = `
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
  
  ga('create', '${gaId}', 'auto');
  ga('send', 'pageview');
  `.trim();

  const gtagCode = `
ga('send', '${event}', ${category}, '${action}', '${label}', 1); 
`.trim();

  const pageviewCode = ` 
  ga("send", "pageview", '${pageview}');
`.trim();

  const eventDisabled = !gaId || !action || !category || !label || !event;

  return (
    <>
      <h2 className="title">
        <img className="icon" src="/ga-logo.svg" />
        Google Analytics
      </h2>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col span={24} md={8}>
          <Card title="GA Code" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="enter GA Code"
                value={gaId}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("gaId", val);
                }}
              />
              <Button
                type="primary"
                onClick={() => onInitId()}
                block
                disabled={!gaId}
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
          <Card title="GA Event" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="enter event..."
                style={{ width: "100%" }}
                value={event}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("event", val);
                }}
                disabled
              />
              <Input
                placeholder="enter acion..."
                style={{ width: "100%" }}
                value={action}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("action", val);
                }}
                disabled
              />
              <Input
                placeholder="enter label..."
                style={{ width: "100%" }}
                value={label}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("label", val);
                }}
              />
              <Input
                placeholder="enter category..."
                style={{ width: "100%" }}
                value={category}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("category", val);
                }}
              />
              <Button
                type="primary"
                onClick={send}
                block
                disabled={eventDisabled}
              >
                Send GA
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
          <Card title="GA Pageview" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* <Input
                placeholder="網頁標題"
                style={{ width: "100%" }}
                value={pageviewTitle}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("pageviewTitle", val);
                }}
              /> */}
              <Input
                placeholder="網頁路徑"
                style={{ width: "100%" }}
                value={pageview}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("pageview", val);
                }}
              />
              <Button
                type="primary"
                onClick={sendPageView}
                block
                disabled={!gaId || !pageview}
              >
                Pageview
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={24} md={16}>
          <Card bordered={false}>
            <CodeArea text={pageviewCode} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
