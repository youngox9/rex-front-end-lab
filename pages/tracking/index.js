import { useEffect, useState } from "react";
import CodeArea from "@/components/CodeArea";
import _ from "lodash";
import { useRouter } from "next/router";

import { Card, message, Space, Row, Col, Input, Button } from "antd";
import ReactGA from "react-ga4";

const INIT_CONFIG = {
  gaId: "UA-118980614-2",
  pageview: "",
  category: "",
  action: "click",
  label: "",
  event: "event",
};

export default function Test1() {
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
    pageviewTitle = "",
  } = config;
  //   useEffect(() => {}, [pixelId]);

  useEffect(() => {
    const historyConfig =
      JSON.parse(localStorage.getItem("gaConfig")) || INIT_CONFIG;

    if (historyConfig?.gaId) {
      onInitId(historyConfig.gaId);
    }
    setConfig(historyConfig);
  }, []);

  function onInitId(id = gaId) {
    console.log("init", id);
    ReactGA.initialize(id);
    ReactGA.send("pageview");
    message.success(`init GAID: ${id}`);
  }

  function onChangeConfig(key, value) {
    const clone = { ...config };
    const temp = _.set(clone, key, value);
    setConfig(temp);
    localStorage.setItem(pathname, JSON.stringify(temp));
  }

  function sendGtag() {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    });
    message.success(`Send GTAG: ${action}, ${category}, ${label}`);
  }

  function sendPageView() {
    gtag("config", gaId, {
      page_title: pageviewTitle,
      page_path: pageview,
    });
    message.success(`Send pageview: ${pageview}`);
  }

  const eventDisabled = !gaId || !action || !category || !label || !event;

  const gtagInitCode = `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-118980614-2"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', '${gaId}');
</script>
  `.trim();

  const gtagCode = `
gtag('${event}', '${action}', {
    'event_category': '${category}',
    'event_label': '${label}'
});
    `.trim();

  const pageviewCode = ` 
gtag("config", '${gaId}', {
      page_title: '${pageviewTitle}',
      page_path: '${pageview}',
});`.trim();

  return (
    <>
      <h2 className="title">
        <img className="icon" src="/ga-logo.svg" />
        Google Analytics
      </h2>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col span={24} md={8}>
          <Card title="GTAG Code" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="enter GTAG Code"
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
          <Card title="GTAG Event" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="enter event..."
                style={{ width: "100%" }}
                value={event}
                disabled
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("event", val);
                }}
              />
              <Input
                placeholder="enter acion..."
                style={{ width: "100%" }}
                value={action}
                disabled
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("action", val);
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
              <Input
                placeholder="enter label..."
                style={{ width: "100%" }}
                value={label}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("label", val);
                }}
              />
              <Button
                type="primary"
                onClick={sendGtag}
                block
                disabled={eventDisabled}
              >
                Send Gtag (GA4)
              </Button>
              {/* <Row gutter={12}>
                <Col span={12}></Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    onClick={sendGa}
                    block
                    disabled={eventDisabled}
                  >
                    Send GTAG (GA3)
                  </Button>
                </Col>
              </Row> */}
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
              <Input
                placeholder="網頁標題..."
                style={{ width: "100%" }}
                value={pageviewTitle}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("pageviewTitle", val);
                }}
              />
              <Input
                placeholder="網頁路徑"
                style={{ width: "100%" }}
                value={pageview}
                onChange={(e) => {
                  const val = e.target.value;
                  onChangeConfig("pageview", val);
                }}
              />
              <Button type="primary" onClick={sendPageView} block>
                Pageview (GA4)
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
