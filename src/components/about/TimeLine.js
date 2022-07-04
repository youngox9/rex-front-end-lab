import styled from "styled-components";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { Button } from "antd";

import { v4 as uuidv4 } from "uuid";

const TimeLineStyled = styled.div`
  display: block;

  .vertical-timeline-element-content {
    background-color: black;

    box-shadow: none;
    .vertical-timeline-element-content-arrow {
      border-right: 7px solid black;
    }
    .vertical-timeline-element-icon {
      overflow: hidden;
    }
  }
`;

export default function TimeLine() {
  return (
    <TimeLineStyled className="timeline">
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2014/09~2018/09"
          iconStyle={{
            background: `url(/timeline/pic1.jpg) white center/contain no-repeat`,
          }}
        >
          <h3>倚睿數位有限公司</h3>
          <p>
            公司性質為接案公司，業務主要為廣告以及網站製作。 <br />
            作品主要為活動官方網站、活動網站、跨平台手機APP的開發。
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2018/09~2021/03"
          iconStyle={{
            background: `url(/timeline/pic2.jpg) white center/contain no-repeat`,
          }}
        >
          <h3>緯創資通股份有限公司</h3>
          <p>
            緯創位於高雄的南部分部
            。公司主要業務為設計與製造代工(ODM)，本公司位於台北以及新竹。
            <br />
            專案以內部專案為主，跑Scrum進行開發，主要負責前端項目之開發
            <br />
            作品： wi-procurement
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2021/04~2021/12"
          iconStyle={{
            background: `url(/timeline/pic3.jpg) white center/contain no-repeat`,
          }}
        >
          <h3>博相科技股份有限公司</h3>
          <p>
            Plustek 精益科技 位於高雄的軟體分部，
            <br />
            公司主要業務為掃描器以及提供影像辨識服務。
            <br />
            作品： doCaptures 2.0
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2022/01 ~ now"
          iconStyle={{
            background: `url(/timeline/pic4.jpg) white center/contain no-repeat`,
          }}
        >
          <h3>中華電信股份有限公司</h3>
          <p>
            協助CRM部門之前端項目開發，並與外包廠商溝通合作、共同開發。 <br />
            作品： 問卷平台、LINE官方帳號管理後台
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </TimeLineStyled>
  );
}
