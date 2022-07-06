import CodeArea from "@/components/CodeArea";
import { Button, Card, Row, Col, Input, Popover, Select } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";

import { v4 as uuidv4 } from "uuid";
import Moveable from "react-moveable";
import $ from "jquery";

export default function MoveItem(props) {
  const { data = {}, onChange = () => {} } = props;
  const {
    src = "",
    style = { left: 0, top: 0 },
    key = uuidv4(),
    mode = "",
  } = data;

  const [el, setEl] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = document.querySelector(`.item-${key}`);
    const c = document.querySelector(`.move-container`);
    if (t && c) {
      setEl([t, c]);
    }
  }, []);

  function onDrag(pos) {
    const { left: l, top: t, width: w, height: h } = pos;
    const { width: cw, height: ch } = el?.[1]?.getBoundingClientRect();

    const left = (l / cw) * 100;
    const top = (t / ch) * 100;

    const elLeft = left > 100 ? 100 : left;
    const elTop = top > 100 ? 100 : top;

    onChange({
      ...data,
      style: { ...style, left: `${elLeft}%`, top: `${elTop}%` },
    });
  }

  function onResize(pos) {
    const { left: l, top: t, width: w, height: h } = pos;
    const { width: cw, height: ch } = el?.[1]?.getBoundingClientRect();

    const width = (w / cw) * 100;
    const height = (h / ch) * 100;

    onChange({
      ...data,
      style: { ...style, width: `${width}%`, height: `${height}%` },
    });
  }

  const isReady = el?.[0] && el?.[1];

  return (
    <>
      <div
        className={`item-${key}`}
        style={style}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {mode === "pic" && <img src={data.src} alt="" />}
      </div>

      {isReady && (
        <Moveable
          target={el[0]}
          // container={el[1]}
          origin
          draggable
          resizable
          onDrag={onDrag}
          onResize={onResize}
          keepRatio
        />
      )}
    </>
  );
}
