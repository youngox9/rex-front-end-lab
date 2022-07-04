import { useEffect, useState } from "react";
import styled from "styled-components";

import { GlobalOutlined } from "@ant-design/icons";
import _ from "lodash";

import { Row, Col, Button } from "antd";

import { v4 as uuidv4 } from "uuid";
import "swiper/css";

import { Controller, Scene } from "react-scrollmagic";
import { Controls, PlayState, Tween } from "react-gsap";

const DEFAULT_LIST = [
  {
    key: uuidv4(),
    title: "Ace 艾斯傳媒行銷",
    content: "官方網站",
    href: "https://ace-taipei.com/",
    src: "/gallery/pic1.jpg",
    color: "white",
  },
  {
    key: uuidv4(),
    title: "鉅怡智慧",
    content: "官方網站",
    href: "https://www.faceheart.com/",
    src: "/gallery/pic2.jpg",
    color: "white",
  },
  {
    key: uuidv4(),
    title: "KAKAO WEBTOON",
    content: "活動頁面",
    href: "https://event-kakaowebtoon.com.tw/",
    src: "/gallery/pic3.jpg",
    color: "black",
  },
  {
    key: uuidv4(),
    title: "愛爾康 Freshlook 小星瞳",
    content: "活動頁面",
    href: "https://2022freshlook.com.tw/video_game/",
    src: "/gallery/pic4.jpg",
    color: "#024997",
  },
  {
    key: uuidv4(),
    title: "ASICS",
    content: "官方網站 (現已改版)",
    href: "https://www.asics.com.tw/?lang=zh-TW",
    src: "/gallery/pic5.jpg",
    color: "#011e62",
  },
  {
    key: uuidv4(),
    title: "e-moving",
    content: "官方網站 (現已改版)",
    href: "https://www.e-moving.com.tw/Index",
    src: "/gallery/pic6.jpg",
    color: "white",
  },
  {
    key: uuidv4(),
    title: "NISSAN 貓妻心理學",
    content: "活動網站",
    href: "https://event.nissan.com.tw/MARCH_meow/desktop.html",
    src: "/gallery/pic7.jpg",
    color: "#f68696",
  },
  {
    key: uuidv4(),
    title: "中鋼運通",
    content: "官方網站",
    href: "http://www.csebulk.com.tw/",
    src: "/gallery/pic8.jpg",
    color: "white",
  },
  {
    key: uuidv4(),
    title: "G-SHOCK",
    content: "官方網站(已改版)",
    href: "https://gshock.casio.com/tw/",
    src: "/gallery/pic9.jpg",
    color: "black",
  },
  {
    key: uuidv4(),
    title: "永豐ibrAin 智在未來",
    content: "官方網站",
    href: "https://bank.sinopac.com/sinopacBT/webevents/ibrain/index.html",
    src: "/gallery/pic10.jpg",
    color: "#f56c6c",
  },
  {
    key: uuidv4(),
    title: "NISSAN TIIDA 你看! 我最牛的應景祝賀",
    content: "活動網站",
    href: "https://event.nissan.com.tw/202102tiida_21my/happy_new_year/",
    src: "/gallery/pic11.jpg",
    color: "white",
  },
  {
    key: uuidv4(),
    title: "Lycklig 藝珂廣告",
    content: "官方網站",
    href: "https://lycklig.com.tw",
    src: "/gallery/pic12.jpg",
    color: "#f1f1f1 ",
  },
  {
    key: uuidv4(),
    title: "元山科技",
    content: "官方網站",
    href: "https://www.ystech.com.tw",
    src: "/gallery/pic13.jpg",
    color: "white ",
  },
  {
    key: uuidv4(),
    title: "PUBG MOBILE：絕地求生M 台服二週年生日快樂！",
    content: "活動網站",
    href: "https://www.pubgmobile.com/TW/event/tw2nd/",
    src: "/gallery/pic14.jpg",
    color: "white",
  },
  {
    key: uuidv4(),
    title: "BENQ 我的角色 我做主 活動網站",
    content: "活動網站",
    href: "https://benq2021mobiuz.com/",
    src: "/gallery/pic15.jpg",
    color: "black",
  },
  {
    key: uuidv4(),
    title: "楊氏速讀文教機構",
    content: "官方網站",
    href: "  https://www.yangs.com.tw/",
    src: "/gallery/pic16.jpg",
    color: "white",
  },
];

const GalleryItemStyled = styled.div`
  display: block;
  width: 100%;
  height: 120px;
  background: ${({ src, color = "white" }) => {
    return `url(${src}) ${color} center/contain no-repeat`;
  }};
  transition: 0.3s ease all;
  perspective: 1000px;
  overflow: hidden;
  border-radius: 4px;
  transition: 0.6s ease all;
  backface-visibility: hidden;
  &:hover {
    /* height: 200px; */
    box-shadow: 0px 0px 25px #fff;
    .mask {
      visibility: visible;
      transform: translate(0, 0) rotateX(0deg);
      opacity: 1;
    }
  }
  .mask {
    transition: 0.6s ease all;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(4px);
    transform: translate(0, 0) rotateX(90deg);
    transform-origin: center bottom;
    visibility: hidden;
    opacity: 0;
    padding: 12px;
    h4 {
      font-size: 16px;
      font-weight: bolder;
      margin-bottom: 12px;
      line-height: 1.5;
      text-align: center;
    }
    p {
      font-size: 12px;
      line-height: 1.5;
      text-align: center;
    }
  }
`;

const GalleryItem = (props) => {
  const { href, src, title, content } = props;
  return (
    <GalleryItemStyled href={href} {...props}>
      <div className="mask">
        <h4>{title}</h4>
        {content && <p>{content}</p>}
        <Button
          href={href}
          target="_blank"
          htmlType="a"
          size="small"
          icon={<GlobalOutlined />}
        >
          前往
        </Button>
      </div>
    </GalleryItemStyled>
  );
};

export default function About(props) {
  const [list, setList] = useState(DEFAULT_LIST);

  return (
    <Controller>
      <div className="gallery">
        <Row gutter={[24, 24]}>
          {list.map((o) => {
            return (
              <Scene duration={"50%"} key={o.key} triggerHook={0.2}>
                {(progress, event) => (
                  <Col
                    className="col"
                    md={{ span: 12 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <GalleryItem {...o} />

                    {/* {progress}
                    <Tween
                      from={{ x: "0px" }}
                      to={{ x: "200px" }}
                      totalProgress={progress}
                    >
                      <div>
                      
                    </Tween> */}
                  </Col>
                )}
              </Scene>
            );
          })}
        </Row>
      </div>
    </Controller>
  );
}
