import React from 'react';
import { Text } from '../components';

const CustomError = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text level={2} text="Something went wrong..." />
    </div>
  );
};

CustomError.layout = 'plain';

export default CustomError;
