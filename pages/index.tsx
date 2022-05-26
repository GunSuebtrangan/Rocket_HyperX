import type { NextPage } from "next";
import { Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";
import Rocketdetail from "../component/Rocketdetail";
const Home: NextPage = () => {
  return (
    <>
      {/* <h1>antd version: {version}</h1>
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button> */}
      <Rocketdetail />
    </>
  );
};
export default Home;
