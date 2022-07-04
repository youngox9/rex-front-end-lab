import Head from "next/head";

import { PageHeader, Row, Col, Input, Divider, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "@/components/Layout";
import CodeArea from "@/components/CodeArea";

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <>
      <h2 className="title">
        <img className="icon" src="/embed-icon.png" />
        HTML Embed 嵌入程式碼測試
      </h2>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input.TextArea
          autoSize
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="請輸入html字串..."
          style={{
            maxWidth: "100%",
          }}
        />
        <CodeArea text={value} />
        <Divider />
        <h3>輸出結果</h3>
        <div dangerouslySetInnerHTML={{ __html: value }}></div>
      </Space>
    </>
  );
}
