import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Row, Col, Table, Switch } from 'antd';
import { Text } from '../../components';
import { myGet } from '../../helper/myGet';
import axios from 'axios';

const DoaHarapan = ({ response, cookie, tokenAccess }) => {
  const newData = response.invitations.map((item) => {
    return {
      ...item,
      // show: item.show ? true : false,
      wish: item.wish ? item.wish : 'Belum mengisi kehadiran',
    };
  });
  const [data, setData] = useState(newData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    Router.push(Router.asPath);
  };

  const toggleShow = (user) => {
    axios
      .put(
        `http://localhost:3000/api/invitation/${user.id_invitation}`,
        {
          name: user.name,
          show: !user.show,
        },
        {
          headers: {
            cookie: cookie,
            Authorization: tokenAccess,
          },
        }
      )
      .then(() => {
        refreshData();
        console.log('success');
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'name',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Wish',
      dataIndex: 'wish',
      sorter: (a, b) => a.wish.length - b.wish.length,
      sortDirections: ['descend'],
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
      <Row>
        <Col>
          <Text level={2} text="Doa dan Harapan" />
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

export default DoaHarapan;
