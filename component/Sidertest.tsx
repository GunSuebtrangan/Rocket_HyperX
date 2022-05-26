import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useRouter } from "next/router";
// import Test from "./Test";
import { nameState } from "../states/dataTestRecoil";
interface gqlDataRockets {
  id: string;
  name: string;
}
interface test {
  key: string;
  label: string;
  children?: { key: string; label: string };
}
const { Header, Sider, Content } = Layout;
const Sidertest = ({ children }: any) => {
  const [Rocketdata, setRocketdata] = useState<Array<test>>([]);
  // const [test, settest] = useRecoilState(nameState);
  const router = useRouter();
  let keypath;
  const getRocket = gql`
    query GetRocket {
      rockets {
        id
        name
      }
    }
  `;
  const { loading, error, data } = useQuery(getRocket, {
    onCompleted: (data) => {
      let rocketData = [
        {
          key: "rocket",
          label: "Rocket",
          children: data.rockets.map((value: gqlDataRockets) => {
            return {
              key: value.id,
              label: value.name,
            };
          }),
        },
        { key: "launches", label: "Launches" },
        { key: "ships", label: "Ships" },
      ];
      setRocketdata(rocketData);
      // settest(data);
    },
  });
  const [idRocket, setidRocket] = useState("");
  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header"></Header>
      <Layout>
        <Sider trigger={null} collapsible style={{ backgroundColor: "coral" }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            style={{
              height: "100%",
            }}
            items={Rocketdata}
            defaultOpenKeys={["rocket"]}
            onClick={(event) => {
              // onClickRocket(event.key);
              // console.log(event);
              if (event.keyPath.length === 1) {
                keypath = event.keyPath[0];
              } else {
                keypath = event.keyPath[1];
              }
              // console.log(keypath);
              console.log("event", event);
              router.push(`/${keypath}/${event.key}`);
            }}
          />
        </Sider>
        <Content
          style={{
            margin: "24px",
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidertest;
