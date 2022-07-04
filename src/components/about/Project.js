import _ from "lodash";

import styled from "styled-components";
import { Row, Col } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Container = styled.div`
  .project-item {
    h3 {
      font-size: 36px;
      margin-bottom: 24px;
    }
    p {
      line-height: 2;
    }
  }
  .pic {
    display: block;
    width: 100%;
    height: 300px;
  }
`;
export default function Project(props) {
  return (
    <Container className="project">
      <Row gutter={[24, 120]}>
        <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <div className="project-item">
            <h3>
              緯創資通 Wiston <br /> wi-eprocurement
            </h3>

            <p>
              緯創R360數位轉型計畫的其中之一 客戶為公司內高階主管
              <br />
              CE/ME/RD 角色們能即時瀏覽、新增刪修各項價格，並將計算流程數位化。
              <br />
              完成整個報價程序，並匯出各種報表。 使用技術：ReactJS + redux +
              <br />
              epic UI 框架： bootstrap + ant-design + d3.js
            </p>
            <a
              href="https://drive.google.com/drive/folders/1Na6NuKnq5rJijxXL_r0nMRWxqr63DgNh?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              UI備份
            </a>
          </div>
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <Swiper
            autoHeight
            spaceBetween={100}
            slidesPerView={1}
            loop
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
          >
            <SwiperSlide>
              {/* <ImageViewerItem src="/project/wistron/pic1.jpg" /> */}
              <img src="/project/wistron/pic1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/project/wistron/pic2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/project/wistron/pic3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/project/wistron/pic4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/project/wistron/pic5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/project/wistron/pic6.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/project/wistron/pic7.jpg" />
            </SwiperSlide>
          </Swiper>
        </Col>

        <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <div className="project-item">
            <h3>doCapture 2.0</h3>
            <p>
              為博相科技開發的 字元辨識雲端服務 1.0 版本客群主要為 <br />
              購買Plustek掃描器的客戶，提供單機版本 2.0 則升級為 訂閱制雲端服務{" "}
              <br />
              該專案UI+開發由我自己一手包辦 <br />
              使用技術：VueJS + nuxt.js UI 框架： bootstrap + ant-design
            </p>
            <a
              href="https://github.com/youngox9/doCapture2"
              target="_blank"
              rel="noreferrer"
            >
              Source Code 備份
            </a>
          </div>
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <Swiper
            autoHeight
            spaceBetween={100}
            slidesPerView={1}
            loop
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
          >
            <SwiperSlide>
              <div className="yt-container">
                <iframe
                  src="https://drive.google.com/file/d/18rbESgGBi84UjTqbIN_g4a3_IqoPS1O7/preview"
                  width="640"
                  height="480"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                ></iframe>
              </div>
            </SwiperSlide>
          </Swiper>
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <div className="project-item">
            <h3>成大智慧餐車</h3>
          </div>
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <Swiper
            autoHeight
            spaceBetween={100}
            slidesPerView={1}
            loop
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
          >
            <SwiperSlide>
              <div className="yt-container">
                <iframe
                  src="https://drive.google.com/file/d/1Gb0bMqEVZFSZxQbw0HQT3viogx-KTLU5/preview"
                  width="640"
                  height="480"
                  allow="autoplay"
                  allowFullScreen
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <div className="project-item">
            <h3>鞋生活 shoelives</h3>
            <p>
              來自中國的客戶
              <br />
              需求主要是希望完全仿造蝦皮
              <br />
              並加入他們獨創的紙娃娃功能，讓使用者客製自己的鞋子
              <br />
              使用技術：ReactJS + OnsenUI
              <br />
            </p>
            <a
              href="http://www.pc6.com/az/441570.html"
              target="_blank"
              rel="noreferrer"
            >
              大陸商店Store備份
            </a>
          </div>
        </Col>
        <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
          <Swiper
            autoHeight
            spaceBetween={100}
            slidesPerView={1}
            loop
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
          >
            <SwiperSlide>
              <div
                className="pic"
                style={{
                  background: `url('/project/shoeselives/pic1.jpg') black center/contain no-repeat`,
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="pic"
                style={{
                  background: `url('/project/shoeselives/pic2.jpg') black center/contain no-repeat`,
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="pic"
                style={{
                  background: `url('/project/shoeselives/pic3.jpg') black center/contain no-repeat`,
                }}
              />
            </SwiperSlide>
          </Swiper>
        </Col>
      </Row>
    </Container>
  );
}
