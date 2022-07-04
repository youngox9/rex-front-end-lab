import Head from "next/head";

import { useSelector, useDispatch } from "react-redux";
import { PageHeader, Button, Descriptions } from "antd";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <h2 className="title">Welcom to front-end lab</h2>
    </>
  );
}
