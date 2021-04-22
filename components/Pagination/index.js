import React from 'react';
import { Pagination } from 'antd';

const PaginationComponent = ({ current, totalPage, onChange }) => {
  return (
    <Pagination
      showQuickJumper
      defaultCurrent={current}
      total={totalPage}
      onChange={onChange}
    />
  );
};

export default PaginationComponent;
