import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ImageModal from "@/components/ImageModal";
import CodeArea from "@/components/CodeArea";
import YouTube from "react-youtube";
import _ from "lodash";

import {
  Switch,
  Input,
  Card,
  Tabs,
  message,
  Space,
  Row,
  Col,
  Divider,
  Button,
} from "antd";
import JSONInput from "react-json-editor-ajrm";
import { useRouter } from "next/router";
// import ReactPixel from "react-facebook-pixel";

const SETTINGS = {
  autoplay: { type: "switch", default: 0, name: "自動播放" },
  controls: { type: "switch", default: 1, name: "播放列" },
  disablekb: { type: "switch", default: 0, name: "鍵盤功能(1為關閉)" },
  enablejsapi: { type: "switch", default: 1, name: "用api操作的話一定要開啟" },
  start: { type: "number", default: 0, name: "自訂影片開始時間" },
  end: { type: "number", default: "", name: "自訂影片結束時間" },
  fs: { type: "switch", default: 0, name: "全螢幕" },
  hl: { type: "sting", default: "", name: "語言" },
  iv_load_policy: { type: "number", default: 1, name: "影片註釋, 3為取消" },
  loop: { type: "switch", default: 0, name: "重複播放(必須搭配playlist)" },
  playlist: {
    type: "sting",
    default: "",
    name: "播放清單ID, 如果要同個影片播放, id跟list要相同",
  },
  modestbranding: {
    type: "switch",
    default: 0,
    name: "顯示播放列的logo, 1為不顯示",
  },
  origin: {
    type: "switch",
    default: 1,
    name: "開啟同源, 用api操作的話一定要開啟",
  },
  playsinline: {
    type: "switch",
    default: 0,
    name: "在IOS上面的效果, 0在ios上會變成全螢幕播放",
  },
  rel: { type: "switch", default: 1, name: "相關影片" },

  // list: { type: "switch" },
};

const INIT_CONFIG = {
  videoId: "2g811Eo7K8U",
  opts: Object.keys(SETTINGS).reduce((prev, k) => {
    const fieldConfig = SETTINGS?.[k];
    const { default: defaultValue } = fieldConfig;
    if (fieldConfig.type === "switch") {
      return { ...prev, [k]: defaultValue || 0 };
    } else {
      return { ...prev, [k]: SETTINGS?.[k]?.default || "" };
    }
  }, {}),
};

let timer;
export default function Youtube() {
  const [showMask, setShowMask] = useState(false);
  const [player, setPlayer] = useState(null);

  const [config, setConfig] = useState(INIT_CONFIG);
  const [reload, setReload] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const historyConfig =
      JSON.parse(localStorage.getItem(pathname)) || INIT_CONFIG;
    setConfig(historyConfig);
  }, []);

  function onChangeConfig(key, value, reload = true) {
    var clone = { ...config };
    const temp = _.set(clone, key, value);
    setConfig(temp);
    localStorage.setItem(pathname, JSON.stringify(temp));
    if (reload) {
      console.log("reload", reload);
      onReload();
    }
  }

  function onReload() {
    setReload(true);
    clearTimeout(timer);
    timer = setTimeout(() => setReload(false), 600);
  }

  const prefixOpts = Object.keys(config.opts).reduce((prev, k) => {
    const val = config?.opts?.[k];
    if (val === "") {
      return prev;
    }
    return { ...prev, [k]: val };
  });

  const embedCode = `
    <div id="ytplayer"></div>
    <script>
      // Load the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Replace the 'ytplayer' element with an <iframe> and
      // YouTube player after the API code downloads.
      var player;
      function onYouTubePlayerAPIReady() {
        player = new YT.Player('ytplayer', {
          height: '360',
          width: '640',
          videoId: '${config.videoId}',
          playerVars: ${JSON.stringify(config?.opts || {}, null, "\t")}
        });
      }
    </script>
`;

  function playVideo() {
    if (player) {
      player.playVideo();
    }
  }
  function stopVideo() {
    if (player) {
      player.stopVideo();
    }
  }

  function pauseVideo() {
    if (player) {
      player.pauseVideo();
    }
  }

  function hideMask() {
    setShowMask(false);
    playVideo();
  }
  return (
    <>
      <h2 className="title">
        <img className="icon" src="/youtube-icon.png" />
        Youtube
      </h2>
      <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
        <Col span={24} md={12}>
          <Card title="Youtube" bordered={false}>
            <Space>
              <Button size="small" type="primary" danger onClick={onReload}>
                Reload
              </Button>
              <Button size="small" type="primary" primary onClick={playVideo}>
                Play
              </Button>
              <Button size="small" type="primary" primary onClick={pauseVideo}>
                Pause
              </Button>
              <Button size="small" type="primary" primary onClick={stopVideo}>
                Stop
              </Button>
              <Switch
                checked={config.showMask}
                onChange={(e) => {
                  onChangeConfig(`showMask`, !config.showMask);
                }}
              />
            </Space>
            <Divider></Divider>

            <div className="yt-container">
              {showMask
                ? config.showMask
                : false && (
                    <div className="yt-mask">
                      <Button
                        size="large"
                        type="primary"
                        danger
                        onClick={hideMask}
                      >
                        Start Game!!
                      </Button>
                    </div>
                  )}

              {!reload && (
                <YouTube
                  className="yt-player"
                  videoId={config.videoId}
                  opts={{ playerVars: prefixOpts }}
                  onReady={(e) => {
                    if (config.muted) {
                      e.target.mute();
                    }
                    setPlayer(e.target);
                  }}
                />
              )}
            </div>
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card title="Setting" bordered={false}>
            <table className="table" style={{ width: "100%" }}>
              <tr>
                <td>videoId</td>
                <td colSpan="2">
                  <Input
                    placeholder={`Video ID`}
                    style={{ width: "100%" }}
                    value={config.videoId}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChangeConfig(`videoId`, val);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>是否預設靜音</td>
                <td>
                  <Switch
                    checked={config.muted}
                    onChange={(e) => {
                      onChangeConfig(`muted`, !config.muted);
                    }}
                  />
                </td>
              </tr>
              {Object.keys(SETTINGS).map((k) => {
                const { type, name } = SETTINGS?.[k] || {};
                const val = config?.opts?.[k];

                function getField() {
                  if (type === "switch") {
                    return (
                      <>
                        <Switch
                          checked={val === 1 ? true : false}
                          onChange={(e) => {
                            onChangeConfig(`opts.${k}`, val === 1 ? 0 : 1);
                          }}
                        />
                      </>
                    );
                  } else {
                    return (
                      <Input
                        type={type}
                        placeholder={`enter ${k}...`}
                        style={{ width: "100%" }}
                        value={val}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChangeConfig(`opts.${k}`, val);
                        }}
                      />
                    );
                  }
                }

                return (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{getField()}</td>
                    <td>{name}</td>
                  </tr>
                );
              })}
            </table>
          </Card>
        </Col>
        <Col span={24} md={24}>
          <Card title="Code Preview" bordered={false}>
            <CodeArea text={embedCode} language="html" />
          </Card>
        </Col>
      </Row>
    </>
  );
}
