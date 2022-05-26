import "../styles/globals.css";
import type { AppProps } from "next/app";
import WithAppolo from "../service/WithApollo";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
// import { RecoilRoot, useRecoilState } from "recoil";
import Sidertest from "../component/Sidertest";

const { Header, Sider, Content } = Layout;
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WithAppolo>
        {/* <RecoilRoot> */}
        <Sidertest>
          <Component {...pageProps} />
        </Sidertest>
        {/* </RecoilRoot> */}
      </WithAppolo>
    </>
  );
}

export default MyApp;
