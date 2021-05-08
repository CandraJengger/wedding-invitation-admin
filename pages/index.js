import { myGet } from '../helper/myGet';
import { Row, Col, Statistic } from 'antd';
import { BarChart } from '../components';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home({ response }) {
  // console.log(response.invitations)
  const newData = response.invitations.filter((item) => item.wish !== "");
  
  return (
    <Row>
      <Col
        xs={24}
        md={8}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Statistic
          valueStyle={{ fontSize: '2.6rem' }}
          title="Respon"
          value={newData.length}
        />
      </Col>

      <Col xs={24} md={16}>
        <BarChart />
      </Col>
    </Row>
  );
}

export const getServerSideProps = async (ctx) => {
  const response = await myGet('http://localhost:3000/api/invitation', ctx);

  return {
    props: {
      response: response.data,
    },
  };
};
