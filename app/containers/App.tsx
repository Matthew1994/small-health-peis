import React, { ReactNode } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Sider } = Layout;

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  // return <>{children}</>;
  return (
    <Layout>
      <Header className="header" style={{ background: '#40b370' }}>
        <div className="peis-site-logo">
          <a href="/#">
            <img
              src="https://aliwork.alicdn.com/tps/TB1BHCZMXXXXXabXpXXXXXXXXXX-374-57.png"
              alt="logo"
              style={{ height: 31 }}
            />
          </a>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">登记管理</Menu.Item>
          <Menu.Item key="2">排队管理</Menu.Item>
          <Menu.Item key="3">医生诊台</Menu.Item>
        </Menu>
      </Header>
      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Sider width={231} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0, paddingTop: 20 }}
          >
            <Menu.Item key="1">角色与权限</Menu.Item>
            <Menu.Item key="2">产品管理</Menu.Item>
            <Menu.Item key="3">数据报告</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
