import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import XLSX from 'xlsx';
import { Row, Col, Table, Button, Modal, Upload, message } from 'antd';
import { Text } from '../../components';
import { myGet } from '../../helper/myGet';
import { server } from '../../config/server';

import {
  UploadOutlined,
  InboxOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import axios from 'axios';
const { Dragger } = Upload;

const Undangan = ({ response, cookie, tokenAccess }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const refreshData = () => {
    Router.push(Router.asPath);
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  const exportFile = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Daftar Undangan');
    XLSX.writeFile(wb, 'dataundangan_url.xlsx');
  };
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleGenerateNewFile = () => {
    setLoading(true);
    axios
      .get(`${server}/api/invitation/generate`, {
        headers: {
          cookie: cookie,
          Authorization: tokenAccess,
        },
      })
      .then((res) => {
        setLoading(false);
        exportFile(res.data.data.invitations);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [response.invitations]);

  const props = {
    name: 'file',
    multiple: true,
    action: `${server}/api/invitation`,
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

      refreshData();
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

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

  return (
    <>
      <Row>
        <Col>
          <Text level={2} text="Undangan" />
        </Col>
        <Col xs={24} style={{ marginBottom: '24px' }}>
          <Button
            type="primary"
            onClick={showAddModal}
            style={{ marginRight: '16px' }}
          >
            <UploadOutlined />
            Upload undangan
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={handleGenerateNewFile}
            style={{
              marginRight: '16px',
              background: '#0aa41a',
              borderColor: '#0aa41a',
            }}
          >
            <DownloadOutlined />
            Generate undangan
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={response.invitations}
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
  const response = await myGet(`${server}/api/invitation`, ctx);
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
