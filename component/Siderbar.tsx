import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import Rocketdetail from "./Rocketdetail";
const { Header, Sider, Content } = Layout;

const Siderbar: any = () => {
  const [idRocket, setidRocket] = useState("");
  const getRocket = gql`
    query GetRocket {
      rockets {
        id
        company
        name
      }
    }
  `;
  // const getRocketDT = gql`
  //   query AddTodo($idRocket: String!) {
  //     rocket(id: $idRocket) {
  //       name
  //       first_flight
  //       description
  //     }
  //   }
  // `;
  const { loading, error, data } = useQuery(getRocket);
  let rocketData: ItemType[] | undefined = [];

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data) {
    rocketData = [
      {
        key: "Rocket01",
        label: "Rocket",
        children: data.rockets.map((value: any, index: number) => {
          return {
            key: value.id,
            label: value.name,
          };
        }),
      },
    ];
  }
  const onClickRocket = (idRocket: string) => {
    setidRocket(idRocket);
  };
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header className="header"></Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            style={{ backgroundColor: "coral" }}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              style={{
                height: "100%",
              }}
              defaultSelectedKeys={["0"]}
              items={rocketData}
              onClick={(event) => {
                onClickRocket(event.key);
              }}
            />
          </Sider>
          <Content
            style={{
              margin: "24px",
              minHeight: 280,
            }}
          >
            <Rocketdetail idRocket={idRocket} />
          </Content>
        </Layout>

        {/* <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0 }}
          ></Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout> */}
      </Layout>
    </>
  );
};
export default Siderbar;
