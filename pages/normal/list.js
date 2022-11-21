import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  Row,
  Col,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Space,
  Divider,
} from "antd";
import styled from "styled-components";

const Div = styled.div`
  color: white;
  img {
    width: 100%;
  }
  .preview-box {
    aspect-ratio: 160/120;
    width: 50%;
  }

  h4 {
    font-size: 16px;
    margin-bottom: 24px;
  }
  .list,
  textarea {
    margin-top: 12px;
    height: 300px;
    padding: 4px;
    width: 100%;
  }
  .list {
    overflow: hidden;
    overflow-y: auto;
    background-color: black;
    border-radius: 4px;
    p {
      margin-bottom: 4px;
    }
  }
`;

const INITIAL_STATE = {
  a_str: "1\n2\n3\n",
  b_str: "3\n4\n5\n",
  uniq: true,
  symbol: true,
  randomCount: 1,
};

export default function IndexPage(props) {
  // const {} = useSelector((state) => state?.global || {});
  // const dispatch = useDispatch();

  const [data, setData] = useState(INITIAL_STATE);

  const [randomArr, setRandomArr] = useState([]);

  const {
    a_str = "",
    b_str = "",
    uniq = false,
    symbol = false,
    randomCount = 1,
  } = data || {};

  useEffect(() => {
    let temp = INITIAL_STATE;
    try {
      temp = JSON.parse(localStorage.getItem("data", temp));
      console.log(temp);
    } catch (e) {}
    setData(temp);
  }, []);

  useEffect(() => {
    try {
      const temp = JSON.stringify(data);
      localStorage.setItem("data", temp);
    } catch (e) {
      console.log(">>>", e);
    }
  }, [JSON.stringify(data)]);

  function getArray(arr) {
    let result = arr;

    result = _.compact(result);

    if (symbol) {
      result = result.map((o) => o.replace(/([^\w]+|\s+)/g, ""));
    }
    if (uniq) {
      result = _.uniqWith(result);
    }
    return result;
  }

  const a_arr = getArray(a_str.split("\n"));

  const b_arr = getArray(b_str.split("\n"));

  const c = _.intersection(a_arr, b_arr);
  const d = _.difference(a_arr, c);
  const e = _.difference(b_arr, c);

  function onRandom() {
    const total = [...a_arr, ...b_arr];
    const temp = _.sampleSize(total, randomCount);
    setRandomArr(temp);
  }

  return (
    <Div>
      <h2>列表比對工具</h2>
      <Divider />
      <Space>
        <Checkbox
          className="form-check-input"
          type="checkbox"
          checked={data.uniq}
          onChange={() => setData({ ...data, uniq: !data.uniq })}
          id="flexCheckDefault"
        >
          去除重複
        </Checkbox>
        <Checkbox
          className="form-check-input"
          type="checkbox"
          checked={data.symbol}
          onChange={() => setData({ ...data, symbol: !data.symbol })}
          id="flexCheckDefault"
        >
          去除特殊字元
        </Checkbox>
      </Space>
      <Divider />
      <h4>A+B: {a_arr.length + b_arr.length}</h4>
      <Divider />
      <Row gutter={12}>
        <Col span={6}>
          <h4>
            A Input &emsp;
            <span className="badge bg-secondary">
              {a_str.split("\n").length}
            </span>
          </h4>
          <textarea
            className="form-control"
            value={data.a_str}
            onChange={(e) => setData({ ...data, a_str: e.target.value })}
          />
        </Col>

        <Col span={6}>
          <h4>
            B Input &emsp;
            <span className="badge bg-secondary">
              {" "}
              {b_str.split("\n").length}
            </span>
          </h4>
          <textarea
            className="form-control"
            value={data.b_str}
            onChange={(e) => setData({ ...data, b_str: e.target.value })}
          />
        </Col>
        <Col span={6}>
          <h4>
            A Output &emsp;
            <span className="badge bg-secondary">{a_arr.length}</span>
          </h4>
          <div className="list">
            {a_arr.map((o, i) => (
              <p key={i}>{o}</p>
            ))}
          </div>
        </Col>
        <Col span={6}>
          <h4>
            B Output &emsp;
            <span className="badge bg-secondary">{b_arr.length}</span>
          </h4>
          <div className="list">
            {b_arr.map((o, i) => (
              <p key={i}>{o}</p>
            ))}
          </div>
        </Col>
      </Row>
      <Divider />
      <Row gutter={12}>
        <Col span={6}>
          <h4>
            (A∩B) &emsp;
            <span className="badge bg-secondary">{c.length}</span>
          </h4>
          <div
            className="preview-box"
            style={{
              background: "url(/test1.jpg) center/contain no-repeat",
            }}
          />
          <div className="list">
            {c.map((o, i) => (
              <p key={i}>{o}</p>
            ))}
          </div>
        </Col>
        <Col span={6}>
          <h4>
            A∩B&apos; &emsp;
            <span className="badge bg-secondary">{d.length}</span>
          </h4>
          <div
            className="preview-box"
            style={{
              background: "url(/test2.jpg) center/contain no-repeat",
            }}
          />
          <div className="list">
            {d.map((o, i) => (
              <p key={i}>{o}</p>
            ))}
          </div>
        </Col>
        <Col span={6}>
          <h4>
            A&apos;∩B ( &emsp;
            <span className="badge bg-secondary">{e.length}</span>
          </h4>
          <div
            className="preview-box"
            style={{
              background: "url(/test3.jpg) center/contain no-repeat",
            }}
          />
          <div className="list">
            {e.map((o, i) => (
              <p key={i}>{o}</p>
            ))}
          </div>
        </Col>
        <Col span={6}>
          <h4>隨機抽樣</h4>
          <Space>
            <InputNumber
              type="number"
              className="form-control"
              placeholder="抽樣數"
              value={data.randomCount}
              onChange={(val) => setData({ ...data, randomCount: val })}
            />
            <Button
              type="primary"
              className="btn btn-primary"
              onClick={onRandom}
            >
              抽樣
            </Button>
          </Space>
          <div className="list">
            {randomArr.map((o, i) => (
              <p key={i}>{o}</p>
            ))}
          </div>
        </Col>
      </Row>
    </Div>
  );
}
