import React, { useState } from 'react';
import { Row, Col, Table, Switch } from 'antd';
import { Text, Pagination } from '../../components';
import { myGet } from '../../helper/myGet';

const DoaHarapan = ({ response }) => {
  const newData = response.invitations.map((item) => {
    return {
      ...item,
      // show: item.show ? true : false,
      wish: item.wish ? item.wish : 'Belum mengisi kehadiran',
    };
  });
  const [data, setData] = useState(newData);
  const [checked, setChecked] = useState({
    show: false,
  });

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
          defaultChecked={text ? true : false}
          // onChange={}
        />            
      ),
    },
  ];
  
  function onChange(pagination, filters, sorter, extra, checked) {
    console.log('params', pagination, filters, sorter, extra);
    console.log(`switch to ${checked}`);
  }

  return (
    <>
      <Row>
        <Col>
          <Text level={2} text="Doa dan Harapan" />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Table columns={columns} dataSource={data} onChange={onChange} rowKey="id_invitation"/>
        </Col>
      </Row>
      <Row justify="end" style={{ marginTop: '100px' }}>
        <Col>
          <Pagination current={1} totalPage={200} />
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const response = await myGet('http://localhost:3000/api/invitation', ctx);

  return {
    props: {
      response: response.data,
    },
  };
};

export default DoaHarapan;
