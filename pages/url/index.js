import { myGet } from '../../helper/myGet';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Row, Col, Table, Space, Button, Modal, Input } from 'antd';
import { Text } from '../../components';
import { server } from '../../config/server';

const { confirm } = Modal;

import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const Url = ({ url_link, cookie, tokenAccess }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [url, setUrl] = useState({
    url: '',
  });

  const refreshData = () => {
    Router.push(Router.asPath);
  };

  const showAddModal = () => {
    setIsAddModalVisible(url_link.length == 0 ? true : false);
  };

  const handleAddModalOk = () => {
    setLoading(true);
    axios
      .post(`${server}/api/url_youtube`, url, {
        headers: {
          Authorization: tokenAccess,
        },
        withCredentials: true,
      })
      .then(() => {
        refreshData();
        setLoading(false);
        setIsAddModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  function showEditModal() {
    setIsEditModalVisible(true);
  }

  const handleEditModalOk = () => {
    setLoading(true);
    axios
      .put(`${server}/api/url_youtube/${url.id_link}`, url, {
        headers: {
          Authorization: tokenAccess,
        },
        withCredentials: true,
      })
      .then((res) => {
        refreshData();
        setLoading(false);
        setIsEditModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const columns = [
    {
      title: 'Link Youtube',
      dataIndex: 'url',
      sorter: (a, b) => a.url.length - b.url.length,
      sortDirections: ['descend'],
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              showEditModal();
              setUrl(record);
            }}
            icon={<EditOutlined />}
            size="large"
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setIsRefreshing(false);
  }, [url_link]);

  return (
    <>
      <Row>
        <Col xs={24}>
          <Text level={2} text="Setting Link Youtube" />
        </Col>
        <Col xs={24} style={{ marginBottom: '24px' }}>
          <Button type="primary" onClick={showAddModal}>
            <PlusOutlined />
            Tambah
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Table columns={columns} dataSource={url_link} rowKey="id_link" />
        </Col>
      </Row>

      {/* Modal Add Link */}
      <Modal
        title="Add Link Youtube"
        visible={isAddModalVisible}
        onCancel={handleAddModalCancel}
        footer={[
          <Button key="cancel" onClick={handleAddModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleAddModalOk}
          >
            Save
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '1rem' }}>
          <label>Url</label>
          <Input
            onChange={(e) => setUrl({ url: e.target.value })}
            placeholder="Input URL"
          />
        </div>
      </Modal>

      {/* Modal Edit */}
      <Modal
        title="Edit Link Youtube"
        visible={isEditModalVisible}
        onCancel={handleEditModalCancel}
        footer={[
          <Button key="cancel" onClick={handleEditModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleEditModalOk}
          >
            Update
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
          <Input
            onChange={(e) => setUrl({ ...url, url: e.target.value })}
            placeholder="Input URL"
            value={url.url}
          />
        </div>
      </Modal>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const response = await myGet(`${server}/api/url_youtube`, ctx);
  const cookie = ctx.req.headers.cookie;
  const tokenAccess =
    ctx.req.cookies.tokenAccess === undefined
      ? ''
      : ctx.req.cookies.tokenAccess;

  return {
    props: {
      url_link: response.data.link_yt,
      cookie,
      tokenAccess,
    },
  };
};

export default Url;
