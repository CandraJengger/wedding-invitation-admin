import React from 'react';
import { Text } from '../components';

const Custom404 = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Text level={2} text="Page not found..." />
    </div>
  );
};

Custom404.layout = 'plain';

export default Custom404;
