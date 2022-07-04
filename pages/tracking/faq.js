import ImageModal from "@/components/ImageModal";
import _ from "lodash";
import { useRouter } from "next/router";
import { Card, Space, Row, Col } from "antd";

export default function Faq() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <h2 className="title">
        <img className="icon" src="/ga-logo.svg" />
        Google Analytics
      </h2>
      <div className="faq">
        <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
          <Col md={8} sm={24}>
            <Card title="GTAG, GA, GTM有何不同?" bordered={false}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <p>
                  <a
                    href="https://chengfengsun.medium.com/gtag-js-%E9%82%84%E6%98%AF-analytics-js-de39f799fe7c"
                    target="_blank"
                    rel="noreferrer"
                  >
                    請參考說明
                  </a>
                </p>
              </Space>
            </Card>
          </Col>
          <Col md={8} sm={24}>
            <Card title="如何建立自己的 Google Analytics?" bordered={false}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <ImageModal src="/ga-4.png" />
                <p>
                  <a
                    href="https://analytics.google.com/analytics/web/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    這裡
                  </a>
                  <span>
                    {
                      "可以在ga管理介面側邊攔 -> 最左下角設定 -> 資源欄 -> 建立資源 中，建立你自己的追蹤資源"
                    }
                  </span>
                </p>
              </Space>
            </Card>
          </Col>
          <Col md={8} sm={24}>
            <Card title="GA code在哪裡?" bordered={false}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <ImageModal src="/ga-1.png" />
                <p>
                  {
                    "可以在ga管理介面側邊攔 -> 最左下角設定 -> 資源欄 -> 追蹤資訊 -> 追蹤程式碼 中找到嵌入程式碼"
                  }
                </p>
              </Space>
            </Card>
          </Col>
          <Col md={8} sm={24}>
            <Card title="GA code要放在網頁的哪裡?" bordered={false}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <ImageModal src="/ga-5.png" />
                <p>{"直接複製程式碼至<head></head>之中即可"}</p>
              </Space>
            </Card>
          </Col>
          <Col md={8} sm={24}>
            <Card title="GA 事件去哪看?" bordered={false}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <ImageModal src="/ga-2.png" />
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      "若GA設定成功，當按下事件鈕的時，可以在ga管理介面側邊攔-> 即時 > 事件 中查看到。",
                  }}
                ></p>
              </Space>
            </Card>
          </Col>
          <Col md={8} sm={24}>
            <Card title="GA PageView去哪看?" bordered={false}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <ImageModal src="/ga-3.png" />
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      "若GA設定成功，當按下事件鈕的時，可以在ga管理介面側邊攔-> 即時 > 內容 中查看到。",
                  }}
                ></p>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
