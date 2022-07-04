import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Modal, Button } from "antd";

export default function ImageModal(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img src={props.src} onClick={() => setIsOpen(true)} />
      <Modal
        // title="Modal 1000px width"
        centered
        visible={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        width={"100%"}
      >
        <img src={props.src} style={{ width: "100%" }} />
      </Modal>
    </>
  );
}
