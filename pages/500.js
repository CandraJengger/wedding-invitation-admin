import React from 'react';
import { Text } from '../components';

const Custom500 = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Text level={2} text="Something went wrong..." />
    </div>
  );
};

Custom500.layout = 'plain';

export default Custom500;
