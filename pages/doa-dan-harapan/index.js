import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Row, Col, Table, Switch, Input } from 'antd';
import { Text } from '../../components';
import { myGet } from '../../helper/myGet';
import axios from 'axios';
import { server } from '../../config/server';

const { Search } = Input;

const DoaHarapan = ({ response, cookie, tokenAccess }) => {
  const [data, setData] = useState(response.invitations);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    Router.push(Router.asPath);
  };

  const toggleShow = (user) => {
    axios
      .put(
        `${server}/api/invitation/${user.id_invitation}`,
        {
          name: user.name,
          show: !user.show,
        },
        {
          headers: {
            Authorization: tokenAccess,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        refreshData();
        console.log('success');
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (value) => {
    axios
      .get(`http://localhost:3000/api/invitation/?name=${value}`, {
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
      title: 'Username',
      dataIndex: 'name',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Wish',
      dataIndex: 'wish',
      sorter: (a, b) => a.wish.length - b.wish.length,
      sortDirections: ['descend'],
      render: (text, record) => {
        return record.wish ? record.wish : 'Belum mengisi kehadiran';
      },
    },
    {
      title: 'Action',
      dataIndex: 'show',
      key: 'action',
      render: (text, record) => (
        <Switch
          checkedChildren="show"
          unCheckedChildren="not show"
          defaultChecked={record.show ? true : false}
          onChange={() => toggleShow(record)}
        />
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra, checked) {
    console.log('params', pagination, filters, sorter, extra);
    console.log(`switch to ${checked}`);
  }

  useEffect(() => {
    setIsRefreshing(false);
  }, [response.invitations]);

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Text level={2} text="Doa dan Harapan" />
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
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            rowKey="id_invitation"
          />
        </Col>
      </Row>
    </>
  );
};

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

export default DoaHarapan;
