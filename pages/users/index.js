import React, { useState, useRef } from 'react';
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

const Users = ({response}) => {
  const newData = response.users.map((item) => {
    return {
      ...item,
    };
  });
  const [data, setData] = useState(newData);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ['descend'],
    },
    // {
    //   title: 'Alamat',
    //   dataIndex: 'alamat',
    //   sorter: (a, b) => a.keterangan.length - b.keterangan.length,
    //   sortDirections: ['descend'],
    // },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={showEditModal}
            icon={<EditOutlined />}
            size="large"
          />
          <Button
            onClick={showDeleteConfirm}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="large"
          />
        </Space>
      ),
    },
  ];

  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     alamat: 'Ponorogo',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     alamat: 'Kebonsari',
  //   },
  // ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
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
    setTimeout(() => {
      setLoading(false);
      setIsAddModalVisible(false);
      console.log(user);
    }, 2000);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  function showEditModal() {
    setIsEditModalVisible(true);
  }

  const handleEditModalOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditModalVisible(false);
    }, 2000);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

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
          <Table columns={columns} dataSource={data} onChange={onChange} />
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
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Input nama"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Alamat</label>
          <Input
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            placeholder="Input alamat"
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
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Input nama"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Alamat</label>
          <Input
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            placeholder="Input alamat"
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

  return {
    props: {
      response: response.data,
    },
  };
};


export default Users;
