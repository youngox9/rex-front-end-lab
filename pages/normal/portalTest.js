import usePortal from "react-useportal";
import { InputNumber, Row, Col, Input, Divider, Space, Checkbox } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { v4 as uuidv4 } from "uuid";

const Div = styled.div`
  .child-wrap {
    width: 95%;
    display: block;
    margin: 0 auto;
    .child-content {
      padding: 12px;
      display: block;
      text-align: left;
      border-color: #ddd;
    }
  }
`;

const OptionComStyled = styled.label`
  /* border: 1px solid red; */
  display: block;
  width: 100%;
  padding: 18px 24px;
  box-shadow: 0px 0px 3px #aaa;
  cursor: pointer;

  background-color: #ddd;
  .ant-checkbox-wrapper {
    color: black;
  }
  p {
    margin: 0;
    color: black;
  }
`;

function OptionCom(props) {
  const {
    index,
    obj,
    onChange = () => {},
    onChangeChildValue = () => {},
    groupIndex = "",
    gridCount,
  } = props;
  const { Portal } = usePortal({
    bindTo: document && document.getElementById(`group-${groupIndex}`),
  });

  return (
    <OptionComStyled className="box" key={obj.key} gridCount={gridCount}>
      <Checkbox
        type="checkbox"
        checked={obj.checked}
        value={obj.checked}
        onChange={(e) => onChange(obj, e)}
      >
        母題{index}
      </Checkbox>
      {obj.checked && (
        <Portal>
          <div className="child-wrap">
            <div className="child-content">
              <p>填寫完母題{index}後，請接續填寫子題：</p>
              <Space>
                <p>{obj?.child?.content}</p>
                <Input
                  type="text"
                  placeholder=""
                  value={obj?.child?.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChangeChildValue(obj, { ...obj?.child, value: val });
                  }}
                />
              </Space>
            </div>
          </div>
        </Portal>
      )}
    </OptionComStyled>
  );
}

export default function App() {
  const [optionCount, setOptionCount] = useState(30);
  const [gridCount, setGridCount] = useState(3);
  const [list, setList] = useState([]);
  useEffect(() => {
    generateOptions(optionCount);
  }, [optionCount]);

  function generateOptions(count = 0) {
    const temp = [...new Array(parseInt(count))].map((o, idx) => {
      return {
        key: uuidv4(),
        checked: false,
        child: {
          content: `child-${idx}`,
          value: "",
        },
      };
    });

    setList(temp);
  }

  function onChange(obj, e) {
    const val = e.target.checked;

    const temp = list.map((o) => {
      if (obj.key === o.key) {
        return { ...o, checked: val };
      }
      return { ...o, checked: false };
    });

    setList(temp);
  }

  function onChangeChildValue(obj, child) {
    const temp = list.map((o) => {
      if (obj.key === o.key) {
        return { ...o, child };
      }
      return o;
    });

    setList(temp);
  }

  return (
    <>
      <Space align="center">
        <p>總共幾題</p>
        <InputNumber
          min="1"
          type="number"
          onChange={(val) => setOptionCount(val)}
          value={optionCount}
        />
        <p>幾欄：</p>
        <InputNumber
          min="1"
          max="24"
          type="number"
          onChange={(val) => setGridCount(val)}
          value={gridCount}
        />
      </Space>
      <Divider />
      <Div>
        <Row gutter={[16, 16]}>
          {list.map((obj, idx) => {
            const groupIndex = Math.ceil((idx + 1) / gridCount);
            return (
              <>
                <Col span={Math.ceil(24 / gridCount)}>
                  <OptionCom
                    index={idx}
                    obj={obj}
                    key={obj.key}
                    onChange={onChange}
                    onChangeChildValue={onChangeChildValue}
                    groupIndex={groupIndex}
                    gridCount={gridCount}
                  />
                </Col>
                {(idx + 1) % gridCount === 0 && (
                  <Col span="24" id={`group-${groupIndex}`}></Col>
                )}
              </>
            );
          })}
        </Row>
      </Div>
    </>
  );
}
