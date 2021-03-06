import React from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { server } from '../../config/server';

const { Header } = Layout;

const HeaderComponent = () => {
  const handleLogout = () => {
    axios
      .post(
        `${process.env.SERVER_URL}/api/logout`,
        {},
        {
          headers: {
            cookie: 'token',
          },
        }
      )
      .then(() => {
        Router.push('/login');
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, textAlign: 'right' }}
    >
      <Button onClick={handleLogout} style={{ marginRight: '16px' }}>
        <LogoutOutlined />
        Logout
      </Button>
    </Header>
  );
};

export default HeaderComponent;
