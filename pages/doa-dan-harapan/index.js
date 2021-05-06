import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Card, Text, Pagination } from '../../components';
import { myGet } from '../../helper/myGet';

const DoaHarapan = ({ response }) => {
  const newData = response.invitations.map(item => {
    return {
      ...item,
      wish: item.wish ? item.wish : 'Belum mengisi kehadiran'
    }
  })
  const [data, setData] = useState(newData)


  return (
    <>
      <Row>
        <Col>
          <Text level={2} text="Doa dan Harapan" />
        </Col>
      </Row>
      <Row>
        {data !== undefined && data.map(item => (
        <Col xs={24} md={12} lg={8} key={item.id_invitation}>
          <Card title={item.name} content={item.wish} />
        </Col>
        ))}
        
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
