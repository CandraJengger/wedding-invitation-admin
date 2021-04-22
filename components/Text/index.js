import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Text = ({ level, text, ...props }) => {
  return (
    <Title level={level} {...props}>
      {text}
    </Title>
  );
};

export default Text;
