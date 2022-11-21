import React, { useState } from "react";

import { useRouter } from "next/router";

import Hamburger from "hamburger-react";
import { LabFlask } from "@styled-icons/entypo";
import { ArrowIosDownwardOutline } from "@styled-icons/evaicons-outline";

const MenuItem = (props) => {
  const { title = "", children, open: propsOpen = true, href } = props;
  const [isOpen, setIsOpen] = useState(propsOpen);
  const router = useRouter();
  return (
    <div className="menu-item">
      {title && (
        <div
          className="menu-title"
          onClick={() => {
            if (href) {
              router.push(href);
            }
            setIsOpen(!isOpen);
          }}
        >
          <h2>
            {title}
            {children && (
              <ArrowIosDownwardOutline
                style={{
                  transform: isOpen ? "rotate(180deg) translate(0px, 2px)" : "",
                  transformOrigin: "50% 30%",
                  transition: "0.3s ease all",
                }}
              />
            )}
          </h2>
        </div>
      )}
      {isOpen && <div className="menu-list">{children}</div>}
    </div>
  );
};

const MenuLink = (props) => {
  const { href, children, ...rest } = props;
  const router = useRouter();

  return (
    <div
      className="menu-link"
      href={href}
      onClick={() => {
        router.push(href);
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default function Layout(props) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={`menu ${isOpen && "active"}`}>
      <div className="menu-head">
        <div
          className="logo"
          href="/"
          onClick={() => {
            router.push("/");
          }}
        >
          <LabFlask />
          <h1>Front-End Lab</h1>
        </div>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <div className="menu-container">
        {/* <MenuItem title="Gallery" href="/gallery"></MenuItem> */}
        <MenuItem title="Normal">
          <MenuLink href="/normal/list">列表比對工具</MenuLink>
          <MenuLink href="/normal/">Html embed</MenuLink>
          <MenuLink href="/normal/font">Font</MenuLink>
          <MenuLink href="/normal/unicode">Unicode</MenuLink>
          <MenuLink href="/normal/cssVariables">CSS Variables</MenuLink>
          <MenuLink href="/normal/portalTest">Portal Test</MenuLink>
          {/* <MenuLink href="/normal/websiteMaker">Website Maker</MenuLink> */}
        </MenuItem>
        <MenuItem title="Google Analytics" href="/tracking">
          <MenuLink href="/tracking">GTAG (GA4)</MenuLink>
          <MenuLink href="/tracking/ga">GA (GA3)</MenuLink>
          <MenuLink href="/tracking/gtm">GTM (GA3)</MenuLink>
          <MenuLink href="/tracking/faq">FAQ</MenuLink>
        </MenuItem>
        <MenuItem title="Facebook Pixel" href="/pixel"></MenuItem>
        <MenuItem title="Youtube" href="/youtube"></MenuItem>
      </div>

      {/* <MenuItem title="Facebook">
        <MenuLink>FB Login</MenuLink>
        <MenuLink>FB Share</MenuLink>
      </MenuItem>
      <MenuItem title="Line"></MenuItem>
      <MenuItem title="Youtube Autoplay" open={false}>
        <MenuLink href="/video">YouTube工具箱</MenuLink>
        <MenuLink href="/video/test1">自動撥放</MenuLink>
        <MenuLink href="/video/test2">自動撥放+靜音</MenuLink>
        <MenuLink href="/video/test3">使用JS播放影片</MenuLink>
        <MenuLink href="/video/test4">使用JS播放影片+靜音</MenuLink>
        <MenuLink href="/video/test5">
          使用JS播放影片+靜音+2秒後解除靜音
        </MenuLink>
      </MenuItem>
      <MenuItem title="Youtune Game">
        <MenuLink href="/video_game/test1">自動撥放</MenuLink>
      </MenuItem>
      <MenuItem title="CloudSteam" />
      <MenuItem title="Unicode Grid" />
      <MenuItem title="Scratch" />
      <MenuItem title="Dragable List" />
      <MenuItem title="Cover/Contain KV" />
      <MenuItem title="Video Swiper" />
      <MenuItem title="Theme" />
      <MenuItem title="pixijs" /> */}
    </div>
  );
}
