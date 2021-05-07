import React, { useState } from 'react';
import { Switch, Card } from 'antd';

const { Meta } = Card;

const CardComponent = ({ title = '', content = '', show = false }) => {
  const [visible, setVisible] = useState(show);

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <Switch
          checkedChildren="show"
          unCheckedChildren="not show"
          defaultChecked={visible ? true : false}
          onChange={onChange}
        />,
      ]}
    >
      <Meta title={title} description={content} />
    </Card>
  );
};

export default CardComponent;
