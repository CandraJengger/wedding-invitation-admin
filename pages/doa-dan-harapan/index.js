import React from 'react';
import { Row, Col } from 'antd';
import { Card, Text, Pagination } from '../../components';

const DoaHarapan = () => {
  return (
    <>
      <Row>
        <Col>
          <Text level={2} text="Doa dan Harapan" />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={12} lg={8}>
          <Card />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card />
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

export default DoaHarapan;
