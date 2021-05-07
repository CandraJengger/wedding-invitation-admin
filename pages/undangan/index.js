import React, { useState } from 'react';
import { Row, Col, Table, Button, Modal, Upload, message } from 'antd';
import { Text } from '../../components';
import { myGet } from '../../helper/myGet';

import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const columns = [
  {
    title: 'Nama',
    dataIndex: 'name',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const Undangan = ({ response, cookie, tokenAccess }) => {
  const [data, setData] = useState(response.invitations);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  const props = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:3000/api/invitation',
    headers: {
      cookie: cookie,
      authorization: tokenAccess,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <>
      <Row>
        <Col>
          <Text level={2} text="Undangan" />
        </Col>
        <Col xs={24} style={{ marginBottom: '24px' }}>
          <Button type="primary" onClick={showAddModal}>
            <PlusOutlined />
            Upload undangan
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            rowKey="id_invitation"
          />
        </Col>
      </Row>

      <Modal
        title="Unggah daftar undangan"
        visible={isAddModalVisible}
        onCancel={handleAddModalCancel}
        footer={[
          <Button key="cancel" type="primary" onClick={handleAddModalCancel}>
            Ok
          </Button>,
        ]}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </Modal>
    </>
  );
};

export default Undangan;

export const getServerSideProps = async (ctx) => {
  const response = await myGet('http://localhost:3000/api/invitation', ctx);
  const cookie = ctx.req.headers.cookie;
  const tokenAccess =
    ctx.req.cookies.tokenAccess === undefined
      ? ''
      : ctx.req.cookies.tokenAccess;

  return {
    props: {
      response: response.data,
      cookie,
      tokenAccess,
    },
  };
};
