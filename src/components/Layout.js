import React from "react";

import Menu from "@/components/Menu";

export default function Layout(props) {
  return (
    <div className="container">
      <Menu />
      <div className="content">{props.children}</div>
    </div>
  );
}
