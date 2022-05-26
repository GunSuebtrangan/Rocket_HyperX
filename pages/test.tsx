import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";
import Rocketdetail from "../component/Rocketdetail";
const Test: NextPage = () => {
  return (
    <>
      <h1>antd version: {version}</h1>
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
      {/* <Siderbar /> */}
    </>
  );
};
export default Test;
