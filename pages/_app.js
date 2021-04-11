import { useState } from 'react';
import Head from 'next/head';
import { Sidebar, Header } from '../components';
import { Layout } from 'antd';

const { Content } = Layout;

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [collapsed, setCollapse] = useState(false);

  const onCollapse = () => setCollapse(!collapsed);

  return (
    <>
      <Head>
        <title>Admin Wedding</title>
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
              <Component {...pageProps} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default MyApp;
