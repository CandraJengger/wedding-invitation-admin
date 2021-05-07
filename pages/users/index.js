import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Row, Col, Table, Space, Button, Modal, Input } from 'antd';
import { Text } from '../../components';
import { myGet } from '../../helper/myGet';

const { confirm } = Modal;

import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const Users = ({ users, cookie, tokenAccess }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
    image: 'dummy.png',
  });

  const refreshData = () => {
    Router.push(Router.asPath);
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  function showDeleteConfirm(id) {
    confirm({
      title: 'Apakah anda yakin ingin menghapus akun ini ?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        axios
          .delete(`http://localhost:3000/api/user/${id}`, {
            headers: {
              cookie: cookie,
              Authorization: tokenAccess,
            },
          })
          .then((res) => {
            refreshData();
          })
          .catch((err) => console.log(err));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalOk = () => {
    setLoading(true);
    axios
      .post('http://localhost:3000/api/user', user, {
        headers: {
          cookie: cookie,
          Authorization: tokenAccess,
        },
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
      .put(`http://localhost:3000/api/user/${user.id_user}`, user, {
        headers: {
          cookie: cookie,
          Authorization: tokenAccess,
        },
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
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
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
              setUser(record);
            }}
            icon={<EditOutlined />}
            size="large"
          />
          <Button
            onClick={() => showDeleteConfirm(record.id_user)}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="large"
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setIsRefreshing(false);
  }, [users]);

  return (
    <>
      <Row>
        <Col xs={24}>
          <Text level={2} text="Setting User" />
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
          <Table
            columns={columns}
            dataSource={users}
            onChange={onChange}
            rowKey="id_user"
          />
        </Col>
      </Row>

      {/* Modal Add User */}
      <Modal
        title="Add User"
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
          <label>Name</label>
          <Input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Input nama"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <Input.Password
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Input password"
          />
        </div>
      </Modal>

      {/* Modal Edit Delete */}
      <Modal
        title="Edit User"
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
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Input nama"
            value={user.username}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <Input.Password
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Input password"
          />
        </div>
      </Modal>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const response = await myGet('http://localhost:3000/api/user', ctx);
  const cookie = ctx.req.headers.cookie;
  const tokenAccess =
    ctx.req.cookies.tokenAccess === undefined
      ? ''
      : ctx.req.cookies.tokenAccess;

  return {
    props: {
      users: response.data.users,
      cookie,
      tokenAccess,
    },
  };
};

export default Users;
