import CodeArea from "@/components/CodeArea";
import { Button, Card, Row, Col, Input, Popover, Select } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";

import { RemoveCircle } from "@styled-icons/ionicons-outline";
import { v4 as uuidv4 } from "uuid";
import { SketchPicker } from "react-color";

const ColorPickerItem = styled.div`
  width: 64px;
  height: 32px;
  background-color: ${({ color }) => {
    return color;
  }};
  cursor: pointer;
  display: block;
  border: 1px solid #aaa;
`;

const GlobalStyle = createGlobalStyle`
     ${({ styleText = "" }) => {
       return styleText;
     }};
`;

export default function Font() {
  const [ready, setReady] = useState(false);
  const [config, setConfig] = useState({ list: [] });
  const router = useRouter();
  const { pathname } = router;

  const { list = [] } = config;

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

  function addColor() {
    const temp = [
      ...list,
      {
        key: uuidv4(),
        name: `var-${list.length}`,
        value: "#fff",
        type: "color",
      },
    ];
    onChangeConfig("list", temp);
  }

  function onRemoveColor(obj) {
    const idx = list.findIndex((o) => o.key === obj.key);
    if (idx > -1) {
      let temp = [...list];
      temp.splice(idx, 1);
      onChangeConfig("list", temp);
    }
  }

  function onChangeColor(obj, key, value) {
    const idx = list.findIndex((o) => o.key === obj.key);
    if (idx > -1) {
      let temp = [...list];
      _.set(temp, `[${idx}].${key}`, value);

      onChangeConfig("list", temp);
    }
  }

  const getStyleText = () => {
    const temp = list.map((o) => {
      return `  --${o.name}:\t${o.value}`;
    });
    const t = temp.join(";\n");
    return `:root {\n ${t} \n}`;
  };

  return (
    <>
      <GlobalStyle list={list} styleText={getStyleText()} />
      {/* <GoogleFontLoader fonts={fontList} subsets={["cyrillic-ext", "greek"]} /> */}
      <h2 className="title">CSS Variables</h2>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col span={24} md={8}>
          <Card title="新增顏色" bordered={false}>
            {list.map((o) => {
              return (
                <Row gutter={[12, 12]} style={{ marginBottom: 12 }} key={o.key}>
                  <Col span={6}>
                    <Input
                      value={o.name}
                      onChange={(e) => onChangeColor(o, "name", e.target.value)}
                    />
                  </Col>
                  <Col span={6}>
                    {/* <Select
                      style={{ width: "100%" }}
                      value={o.type}
                      onChange={(val) => {
                        onChangeColor(o, "type", val);
                      }}
                      options={[
                        { label: "color", value: "color" },
                        { label: "font-size", value: "font-size" },
                      ]}
                    /> */}
                    <Input
                      type="text"
                      value={o.type}
                      onChange={(e) => onChangeColor(o, "type", e.target.value)}
                    />
                  </Col>
                  <Col span={6}>
                    {o.type === "color" ? (
                      <Popover
                        trigger="click"
                        content={
                          <SketchPicker
                            color={o.value}
                            onChangeComplete={(color) =>
                              onChangeColor(o, "value", color.hex)
                            }
                          />
                        }
                        title="顏色選擇器"
                      >
                        <ColorPickerItem color={o.value} />
                      </Popover>
                    ) : (
                      <Input
                        type="text"
                        value={o.value}
                        onChange={(e) =>
                          onChangeColor(o, "value", e.target.value)
                        }
                      />
                    )}
                  </Col>
                  <Col span={6}>
                    <Button
                      size="small"
                      type="text"
                      ghost
                      onClick={() => onRemoveColor(o)}
                    >
                      <RemoveCircle className="icon" />
                    </Button>
                  </Col>
                </Row>
              );
            })}

            <Button onClick={addColor}>新增顏色</Button>
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card title="Code Preview" bordered={false}>
            <CodeArea text={getStyleText()}></CodeArea>
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card title="顏色測試" bordered={false}>
            {list.map((o) => {
              return (
                <p style={{ [o.type]: `var(--${o.name})` }} key={o.key}>
                  {o.name} 永字八法
                </p>
              );
            })}
          </Card>
        </Col>
      </Row>
    </>
  );
}
