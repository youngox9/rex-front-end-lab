import { useEffect, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import { Card, Space, Row, Col, Input } from "antd";
import Word from "@/components/unicode/Word";
import { Fonts } from "@styled-icons/bootstrap";
import fontkit from "@pdf-lib/fontkit";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  translate,
  scale,
  pushGraphicsState,
} from "pdf-lib";
import styled from "styled-components";
import fs from "fs";
import fontPath from "@/font.ttf";

const INIT_CONFIG = {
  PADDING: [12, 24],
  GUTTER: [12, 24],
  LINE_COUNT: 10,
  PAGE_COUNT: 100,
};

const IframeContainer = styled.iframe`
  width: 100%;
  height: 800px;
`;

export default function Unicode() {
  const [pdfSrc, setPdfSrc] = useState("");
  const [config, setConfig] = useState(INIT_CONFIG);
  const router = useRouter();
  const { pathname } = router;

  const { PADDING, GUTTER, LINE_COUNT, PAGE_COUNT } = config;

  useEffect(() => {
    // const historyConfig = JSON.parse(localStorage.getItem(pathname)) || {};
    // setConfig(historyConfig);
  }, []);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const pdfDoc = await initPDF();
    const pdfBytes = await pdfDoc.save();
    const docURL = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfSrc(docURL);
  }

  async function initPDF() {
    const pdfDoc = await PDFDocument.create();
    const res = await fetch(fontPath);
    const fontBytes = await res.arrayBuffer();
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);

    let page = null;
    for (let i = 0; i < 10; i++) {
      const index = i % PAGE_COUNT;
      if (index === 0) {
        page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        page.translateContent(50, 50);
        page = drawGrid({ pdfDoc, page, index, customFont });
      }
      if (page && page.addPage) {
        page.addPage();
        page = drawGrid({ pdfDoc, page, index, customFont });
      }
    }
    return pdfDoc;
  }

  function drawGrid({ pdfDoc, page, index = 0, customFont }) {
    const { width, height } = page.getSize();
    const [xPAD, yPAD] = PADDING;
    const [xGUT, yGUT] = GUTTER;
    const W = width - xPAD * 2 - xGUT * (LINE_COUNT - 1);
    const w = W / LINE_COUNT;
    const h = w;
    const xIndex = index % LINE_COUNT;
    const yIndex = Math.floor(index / LINE_COUNT) + 1;
    const x = xIndex * w + xIndex * xGUT + xPAD;
    const y = page.getHeight() - (yIndex * h + (yIndex - 1) * yGUT + yPAD);

    console.log(page);
    page.translateContent(0, page.getHeight());
    page.drawText("Hello World!");
    page.drawRectangle({
      x: x,
      y: y,
      width: w,
      height: h,
      borderColor: rgb(1, 0, 0),
      borderWidth: 1.5,
    });

    for (let i = 1; i <= 2; i++) {
      page.drawLine({
        start: { x: x + (w / 3) * i, y: y },
        end: { x: x + (w / 3) * i, y: y + h },
        width: w,
        height: h,
        borderColor: rgb(1, 0, 0),
        borderWidth: 1.5,
      });
    }

    for (let i = 1; i <= 2; i++) {
      page.drawLine({
        start: { x: x, y: y + (h / 3) * i },
        end: { x: x + w, y: y + (h / 3) * i },
        width: w,
        height: h,
        borderColor: rgb(1, 0, 0),
        borderWidth: 1.5,
      });
    }

    page.moveTo(0, -20);
    // page.drawText("I will be drawn at the origin");

    // page.drawText("永", {
    //   x: x,
    //   y: y + h * 0.2,
    //   size: w,
    //   font: customFont,
    //   color: rgb(0, 0.53, 0.71),
    // });

    // page.drawText("AAAAAA", {
    //   x: x + w,
    //   y: y + h,
    //   size: 12,
    //   font: customFont,
    //   color: rgb(0, 0.53, 0.71),
    //   position: "top left",
    // });
    return page;
  }

  function onChangeConfig(key, value, reload = true) {
    var clone = { ...config };
    const temp = _.set(clone, key, value);
    setConfig(temp);
    localStorage.setItem(pathname, JSON.stringify(temp));
  }

  return (
    <>
      <h2 className="title">
        <Fonts className="icon" />
        Unicode
      </h2>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        {/* GTM */}
        {/* <Col span={24} md={12}>
          <Card title="Setting" bordered={false}>
            <table className="table" style={{ width: "100%" }}>
              <tr>
                <td>Gutter</td>
                <td colSpan="2">
                  <Input
                    bordered={false}
                    placeholder={`Video ID`}
                    style={{ width: "100%" }}
                    value={config.gutter}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChangeConfig(`videoId`, val);
                    }}
                  />
                </td>
              </tr>
            </table>
          </Card>
        </Col> */}
        <Col span={24} md={24}>
          <Card title="f" bordered={false}>
            {/* <Word /> */}

            <IframeContainer src={pdfSrc} style={{ width: "100%" }} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
