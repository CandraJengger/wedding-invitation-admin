import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Row, Col, Table, Input } from 'antd';
import { Text } from '../../components';
import { myGet } from '../../helper/myGet';
import { server } from '../../config/server';

const { Search } = Input;

const Kehadiran = ({ response, tokenAccess }) => {
  const [data, setData] = useState(response.invitations);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    Router.push(Router.asPath);
  };

  const handleSearch = (value) => {
    axios
      .get(`${process.env.SERVER_URL}/api/invitation/?name=${value}`, {
        headers: {
          Authorization: tokenAccess,
        },
        withCredentials: true,
      })
      .then((res) => {
        refreshData();
        setData(res.data.data.invitations);
      })
      .catch((err) => console.log(err));
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
    {
      title: 'Keterangan',
      dataIndex: 'attending',
      sorter: (a, b) => a.attending.length - b.attending.length,
      sortDirections: ['ascend'],
      render: (text, record) => {
        return record.attending ? 'Hadir' : 'Tidak Hadir';
      },
    },
  ];

  useEffect(() => {
    setIsRefreshing(false);
  }, [response.invitations]);

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Text level={2} text="Kehadiran" />
        </Col>
        <Col>
          <Search
            placeholder="input search text"
            onSearch={(value) => handleSearch(value)}
            enterButton
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Table columns={columns} dataSource={data} rowKey="id_invitation" />
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const response = await myGet(`${process.env.SERVER_URL}/api/invitation`, ctx);
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

export default Kehadiran;
