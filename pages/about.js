import { useEffect } from "react";
import styled from "styled-components";
import Particle from "react-particles-js";
import _ from "lodash";
import ReactGA from "react-ga4";
import Card from "react-animated-3d-card";

import "swiper/css";

import Project from "@/components/about/Project";
import TimeLine from "@/components/about/TimeLine";
import Gallery from "@/components/about/Gallery";
import ThreeDCard from "@/components/ThreeDCard";

const Container = styled.div`
  width: 1200px;
  max-width: 100%;
  display: block;
  margin: 0 auto;

  .particle-bk {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .wrapper {
    position: relative;
    z-index: 2;
    > .title {
      text-align: center;
      margin: 100px 120px;
      font-size: 48px;
    }
  }
  .profile {
    text-align: center;
    .pic {
      width: 150px;
      max-width: 100%;
      border-radius: 100%;
      overflow: hidden;
      display: block;
      margin: 0 auto;
      margin-bottom: 12px;
      img {
        display: block;
        width: 100%;
      }
    }
    p {
      font-size: 14px;
      line-height: 1.5;
    }
  }
`;

export default function About() {
  useEffect(() => {
    ReactGA.initialize("UA-118980614-4");
    ReactGA.ga("send", "pageview");
  }, []);

  return (
    <Container>
      <div className="particle-bk">
        <Particle
          width="100%"
          height="100%"
          params={{
            particles: {
              number: {
                value: 100,
              },
            },
            interactivity: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
            },
          }}
        />
      </div>
      <div className="wrapper">
        <h2 className="title">關於我</h2>
        <div className="profile">
          <div className="pic">
            <ThreeDCard>
              <img src="/profile.jpg" alt="" />
            </ThreeDCard>
          </div>
          <p>Rex</p>
          <p>
            來自澎湖
            <br />
            5 年以上的前端開發經驗，
            <br />
            目前任職於 中華電信 擔任 前端工程師
            <br />
            現居台北，不排斥高雄的發展機會。
            <br />
            <br />
            擅長 ReactJS 以及 VueJS 。
          </p>
        </div>
        <h2 className="title">職涯</h2>
        <TimeLine />
        <h2 className="title">作品集</h2>
        <Gallery />
        <h2 className="title">專案經歷</h2>
        <Project />
      </div>
    </Container>
  );
}
