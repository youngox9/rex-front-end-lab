import CodeArea from "@/components/CodeArea";
import { Button, Card, Row, Col, Input, Divider, Space, Slider } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FontFamily } from "@styled-icons/boxicons-regular";
import { RemoveCircle } from "@styled-icons/ionicons-outline";
import { DragHandle } from "@styled-icons/material";
import { v4 as uuidv4 } from "uuid";

const ALL_FONTWEIGHT = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const INIT_CONFIG = {
  text: "ABCDE永字八法",
  fontSize: 16,
  fontWeight: 600,
  loadFont: [],
  fontList: [
    {
      id: uuidv4(),
      font: "Roboto",
      weights: ALL_FONTWEIGHT,
    },
    {
      id: uuidv4(),
      font: "sans-serif",
      weights: ALL_FONTWEIGHT,
    },
    {
      id: uuidv4(),
      font: "Arial",
      weights: ALL_FONTWEIGHT,
    },
    {
      id: uuidv4(),
      font: "Helvetica Neue",
      weights: ALL_FONTWEIGHT,
    },
    {
      id: uuidv4(),
      font: "Noto Sans TC",
      weights: ALL_FONTWEIGHT,
    },
    {
      id: uuidv4(),
      font: "微軟正黑體",
      weights: ALL_FONTWEIGHT,
    },
  ],
};

function Test() {
  return null;
}

let GoogleFontLoader = () => null;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Font() {
  const [ready, setReady] = useState(false);
  const [FontLoader, setFontLoader] = useState(Test);
  const [config, setConfig] = useState(INIT_CONFIG);
  const router = useRouter();
  const { pathname } = router;

  const { fontList = [] } = config;

  useEffect(() => {
    setReady(true);
    GoogleFontLoader = require("react-google-font-loader").default;
  }, []);

  useEffect(() => {
    const historyConfig =
      JSON.parse(localStorage.getItem(pathname)) || INIT_CONFIG;
    setConfig(historyConfig);
  }, []);

  function onChangeConfig(key, value) {
    const clone = { ...config };
    const temp = _.set(clone, key, value);
    setConfig(temp);
    localStorage.setItem(pathname, JSON.stringify(temp));
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const temp = reorder(
      fontList,
      result.source.index,
      result.destination.index
    );

    onChangeConfig("fontList", temp);
  }

  function addFont() {
    const newItem = {
      id: uuidv4(),
      font: "test",
      weights: [400, 700],
    };
    const temp = [...fontList, newItem];
    onChangeConfig(`fontList`, temp);
  }

  function removeFont(idx) {
    const clone = [...fontList];
    const temp = _.remove(clone, (o, i) => {
      return i !== idx;
    });
    onChangeConfig(`fontList`, temp);
  }

  const FontFamilyText = fontList
    .map((obj) => {
      if (/\s/.test(obj.font)) {
        return `"${obj.font}"`;
      }
      return obj.font;
    })
    .join(", ");

  const FontFamilyCode = `
    font-family: ${FontFamilyText};
  `;

  return (
    <>
      <GoogleFontLoader fonts={fontList} subsets={["cyrillic-ext", "greek"]} />
      {/* <GoogleFontLoader fonts={fontList} subsets={["cyrillic-ext", "greek"]} /> */}
      <h2 className="title">
        <FontFamily className="icon" />
        字體測試
      </h2>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col span={24} md={24}>
          <Card title="Code Preview" bordered={false}>
            <CodeArea text={FontFamilyCode} language={"css"} />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card title="Font" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              {ready && (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        // style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {fontList.map((obj, idx) => {
                          return (
                            <Draggable
                              key={obj.id}
                              draggableId={obj.id}
                              index={idx}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    padding: "6px 0",
                                  }}
                                >
                                  <Row gutter={[12, 12]} align="middle">
                                    <Col flex={"16px"}>
                                      <div {...provided.dragHandleProps}>
                                        <DragHandle className="icon" />
                                      </div>
                                    </Col>
                                    <Col flex={"auto"}>
                                      <Input
                                        placeholder=""
                                        value={obj.font}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          onChangeConfig(
                                            `fontList[${idx}].font`,
                                            val
                                          );
                                        }}
                                      />
                                    </Col>
                                    <Col flex={"12px"}>
                                      <Button
                                        size="small"
                                        type="text"
                                        ghost
                                        onClick={() => removeFont(idx)}
                                      >
                                        <RemoveCircle className="icon" />
                                      </Button>
                                    </Col>
                                  </Row>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
              <Button type="primary" onClick={addFont} block>
                Add Font
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card title="Result" bordered={false}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Row gutter={[12, 12]} align="middle">
                <Col flex={"120px"}>Font Size</Col>
                <Col flex={"auto"}>
                  <Slider
                    value={config.fontSize}
                    min={12}
                    max={60}
                    onChange={(val) => onChangeConfig("fontSize", val)}
                  />
                </Col>
              </Row>
              <Row gutter={[12, 12]} align="middle">
                <Col flex={"120px"}>Font Weight</Col>
                <Col flex={"auto"}>
                  <Slider
                    value={config.fontWeight}
                    step={100}
                    min={100}
                    max={900}
                    onChange={(val) => onChangeConfig("fontWeight", val)}
                  />
                </Col>
              </Row>
              <Row gutter={[12, 12]} align="middle">
                <Col flex={"120px"}>Text</Col>
                <Col flex={"auto"}>
                  <Input.TextArea
                    autoSize
                    value={config.text}
                    onChange={(e) => onChangeConfig("text", e.target.value)}
                    placeholder="請輸入字串"
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                </Col>
              </Row>

              <Divider />
              <h3>輸出結果</h3>
              <p
                style={{
                  fontFamily: `${FontFamilyText}`,
                  fontSize: config.fontSize,
                  fontWeight: config.fontWeight,
                }}
              >
                {config.text}
              </p>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}
