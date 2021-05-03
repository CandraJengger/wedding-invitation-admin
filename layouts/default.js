import Head from 'next/head';
import { useState } from 'react';
import { Sidebar, Header } from '../components';
import { Layout } from 'antd';

const { Content } = Layout;

const DefaultLayout = (props) => {
  const [collapsed, setCollapse] = useState(false);

  const onCollapse = () => setCollapse(!collapsed);
  return (
    <>
      <Head>
        <title>Admin Wedding</title>
        <meta charSet="utf-8" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={collapsed} onCollapse={onCollapse} />
        <Layout className="site-layout">
          <Header />
          <Content style={{ margin: '16px 16px 0' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DefaultLayout;
