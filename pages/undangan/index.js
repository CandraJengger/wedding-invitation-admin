import React, { useState } from 'react';
import { Row, Col, Table } from 'antd';
import { Text } from '../../components';
import { myGet } from '../../helper/myGet';

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

const Undangan = ({response}) => {
  // console.log(response.invitations);
  const newData = response.invitations.map((item) => {
    return {...item,};
  });

  const [data, setData] = useState(newData);
  return (
    <>
      <Row>
        <Col>
          <Text level={2} text="Undangan" />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </Col>
      </Row>
    </>
  );
};

export default Undangan;

export const getServerSideProps = async (ctx) => {
  const response = await myGet('http://localhost:3000/api/invitation', ctx);

  return {
    props: {
      response: response.data,
    },
  };
};