import { useState, useEffect } from 'react';
import { myGet } from '../helper/myGet';
import { Row, Col, Statistic } from 'antd';
import { BarChart } from '../components';
import styles from '../styles/Home.module.css';
import { server } from '../config/server';

export default function Home({ response }) {
  const [data, setData] = useState([]);
  const [countData, setCountData] = useState(0);

  useEffect(() => {
    const newData = response.invitations.filter((item) => item.wish !== '');
    const dataHadir = response.invitations.filter((item) => item.attending);
    const dataTidakHadir = response.invitations.filter(
      (item) => !item.attending
    );

    setData([
      {
        kehadiran: 'Total Hadir',
        Hadir: dataHadir.length,
      },
      {
        kehadiran: 'Total Tidak Hadir',
        'Tidak Hadir': dataTidakHadir.length,
      },
    ]);
    setCountData(newData.length);
  }, []);

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
          valueStyle={{ fontSize: '2.6rem', textAlign: 'center' }}
          title="Respon User"
          value={countData}
        />
      </Col>

      <Col xs={24} md={16}>
        <BarChart data={data} />
      </Col>
    </Row>
  );
}

export const getServerSideProps = async (ctx) => {
  const response = await myGet(`${server}/api/invitation`, ctx);

  return {
    props: {
      response: response.data,
    },
  };
};
