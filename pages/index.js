import Head from 'next/head';
import { Row, Col, Statistic } from 'antd';
import { BarChart } from '../components';
import styles from '../styles/Home.module.css';

export default function Home() {
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
          value={112893}
        />
      </Col>

      <Col xs={24} md={16}>
        <BarChart />
      </Col>
    </Row>
  );
}

export const getServerSideProps = (context) => {
  const { req, res } = context;
  const { cookies } = req;

  console.log(cookies.tokenAccess);

  return {
    props: {},
  };
};
