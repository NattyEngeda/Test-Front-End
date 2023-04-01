import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import Header from "./layout/Header";
// import Index from "./pages/Index";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Tabs } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import type { TabsProps } from "antd";
import Upload from "./pages/Upload-Img";
import VIew from "./pages/VIew";

const nav: MenuProps["items"] = ["Home"].map((key) => ({
  key,
  label: `${key}`,
}));

const App: React.FC = () => {
  const [activeTab, setactiveTab] = useState<Number>(1);
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `View`,
      children: <VIew />,
    },
    {
      key: "2",
      label: `Upload`,
      children: <Upload />,
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={nav}
        />
      </Header>

      <Layout>
        <div className="px-10">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Image Upload
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
