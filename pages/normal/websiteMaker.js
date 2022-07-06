import {
  Button,
  Popover,
  Upload,
  Divider,
  List,
  Card,
  Row,
  Col,
  Input,
  Select,
} from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";

import { v4 as uuidv4 } from "uuid";

import MoveItem from "@/components/MoveItem";
import CodeArea from "@/components/CodeArea";
import { PlusOutlined } from "@ant-design/icons";

const MoveContainer = styled.div`
  position: relative;
  border: 1px solid white;
  min-height: 300px;
  .add-btn {
    position: absolute;
    left: 6px;
    top: 0;
    transform: translate(0, -50%);
  }
  .bk {
    display: block;
    width: 100%;
    z-index: 1;
  }
`;

export default function WebsiteMaker() {
  const [config, setConfig] = useState({ list: [] });
  const router = useRouter();
  const { pathname } = router;

  const [list, setList] = useState([]);
  const [bk, setBk] = useState("https://picsum.photos/600/800");
  useEffect(() => {
    const historyConfig = JSON.parse(localStorage.getItem(pathname)) || {};
    setConfig(historyConfig);
  }, []);

  function onChangeConfig(key, value) {
    const clone = { ...config };
    const temp = _.set(clone, key, value);
    setConfig(temp);
    localStorage.setItem(pathname, JSON.stringify(temp));
  }

  function onChnageItem(item) {
    const temp = list.map((o) => {
      if (o.key === item.key) {
        return item;
      }
      return o;
    });
    setList(temp);
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function onAddPicItem(file) {
    console.log(file);
    const src = await toBase64(file);
    const newItem = {
      key: uuidv4(),
      mode: "pic",
      src,
      style: {
        zIndex: list.length + 1,
        left: "5%",
        top: "5%",
        width: "10%",
        position: "absolute",
      },
    };
    setList([...list, newItem]);
  }

  async function onSetBk(file) {
    const src = await toBase64(file);
    setBk(src);
  }

  return (
    <>
      <h2 className="title">Website Maker</h2>
      <Upload beforeUpload={onSetBk} showUploadList={false} multiple={false}>
        <Button type="primary">新增背景</Button>
      </Upload>
      <Divider />
      <Row>
        <Col span={12}>
          <MoveContainer className="move-container">
            <img className="bk" src={bk} alt="" />
            <Popover
              placement="bottom"
              content={() => {
                return (
                  <>
                    <Upload
                      beforeUpload={onAddPicItem}
                      showUploadList={false}
                      multiple={false}
                    >
                      <Button type="primary">新增圖片</Button>
                    </Upload>
                  </>
                );
              }}
              trigger="click"
            >
              <Button
                className="add-btn"
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
              />
            </Popover>
            {list.map((o) => {
              return <MoveItem data={o} onChange={onChnageItem} key={o.key} />;
            })}
          </MoveContainer>
        </Col>
        <Col span={12}>
          {/* <CodeArea text={JSON.stringify(list)}></CodeArea> */}
        </Col>
      </Row>
    </>
  );
}
