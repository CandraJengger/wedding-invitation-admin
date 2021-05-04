import { myGet } from '../helper/myGet';
import { Row, Col, Statistic } from 'antd';
import { BarChart } from '../components';
import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  console.log(data);
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

export const getServerSideProps = async (ctx) => {
  const response = await myGet('http://localhost:3000/api/invitation', ctx);

  return {
    props: {
      data: response,
    },
  };
};
