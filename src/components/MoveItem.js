import CodeArea from "@/components/CodeArea";
import { Button, Card, Row, Col, Input, Popover, Select } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";

import { v4 as uuidv4 } from "uuid";
import Moveable from "react-moveable";

const MoveContainer = styled.div`
  position: relative;
  border: 1px solid white;
`;

export default function websiteMaker() {
const [uid] = useState(uuidv4();)
  const [ready, setReady] = useState(false);
  const [config, setConfig] = useState({ list: [] });
  const router = useRouter();
  const { pathname } = router;

  const { list = [] } = config;

  const [style, setStyle] = useState({
    position: "absolute",
    top: 10,
    left: 10,
    // height: 20,
    // width: 20,
    backgroundColor: "red",
    zIndex: 9999,
  });
  const [el, setEl] = useState(null);

  useEffect(() => {
    const historyConfig = JSON.parse(localStorage.getItem(pathname)) || {};
    setConfig(historyConfig);
  }, []);

  useEffect(() => {
    setEl(document.querySelector(".target"));
  }, []);

  function onChangeConfig(key, value) {
    const clone = { ...config };
    const temp = _.set(clone, key, value);
    setConfig(temp);
    localStorage.setItem(pathname, JSON.stringify(temp));
  }

  return (
    <>
      <h2 className="title">Website Maker</h2>
      <MoveContainer>
        <div className="target" style={style}>
          123
        </div>
      </MoveContainer>

      {el && (
        <Moveable
          target={el}
          container={null}
          origin={true}
          draggable={true}
          onDrag={({
            target,
            beforeDelta,
            beforeDist,
            left,
            top,
            right,
            bottom,
            delta,
            dist,
            transform,
            clientX,
            clientY,
          }) => {
            // console.log("onDrag left, top", left, top);
            // // target!.style.left = `${left}px`;
            // // target!.style.top = `${top}px`;
            // console.log("onDrag translate", dist);
            // target!.style.transform = transform;
            console.log(left, top);
            setStyle({ ...style, left, top });
          }}
        />
      )}
    </>
  );
}
