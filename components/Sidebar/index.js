import React from 'react';
import Link from 'next/link';
import { Menu, Layout } from 'antd';
import {
  SmileOutlined,
  MailOutlined,
  TeamOutlined,
  HomeOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;

const index = ({ collapsed, onCollapse }) => {
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<MailOutlined />}>
          <Link href="/undangan">
            <a>Undangan</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          <Link href="/kehadiran">
            <a>Kehadiran</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SmileOutlined />}>
          <Link href="/doa-dan-harapan">
            <a>Doa & Harapan</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default index;