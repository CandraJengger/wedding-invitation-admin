import React, { useState } from 'react';
import { Row, Col, Table } from 'antd';
import { Card, Text, Pagination } from '../../components';
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
  {
    title: 'Keterangan',
    dataIndex: 'attending',
    sorter: (a, b) => a.attending.length - b.attending.length,
    sortDirections: ['descend'],
  },
];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     keterangan: 'Hadir',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     keterangan: 'Hadir',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     keterangan: 'Hadir',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     keterangan: 'Hadir',
//   },
// ];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const Kehadiran = ({response}) => {
  const newData = response.invitations.map(item => {
    return {
      ...item,
      attending: item.attending ? 'Hadir': 'Tidak Hadir'
    }
  })
  const [data, setData] = useState(newData)
  
  return (
    <>
      <Row>
        <Col>
          <Text level={2} text="Kehadiran" />
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

export default Kehadiran;


export const getServerSideProps = async (ctx) => {
  const response = await myGet('http://localhost:3000/api/invitation', ctx);

  return {
    props: {
      response: response.data,
    },
  };
};
