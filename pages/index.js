import { myGet } from '../helper/myGet';
import { Row, Col, Statistic } from 'antd';
import { BarChart } from '../components';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home({ response }) {
  const newData = response.invitations.filter((item) => item.wish !== '');
  const dataHadir = response.invitations.filter((item) => item.attending);
  const dataTidakHadir = response.invitations.filter((item) => !item.attending);

  const [data, setData] = useState([
    {
      kehadiran: 'Total Hadir',
      Hadir: dataHadir.length,
    },
    {
      kehadiran: 'Total Tidak Hadir',
      'Tidak Hadir': dataTidakHadir.length,
    },
  ]);

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
          value={newData.length}
        />
      </Col>

      <Col xs={24} md={16}>
        <BarChart data={data} />
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
