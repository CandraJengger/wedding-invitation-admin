import React, { useState } from 'react';
import { Skeleton, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';

const { Meta } = Card;

const CardComponent = () => {
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <Popconfirm
          title="Iki titleeeeeeeeeeeee"
          visible={visible}
          onConfirm={handleOk}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
        >
          <DeleteOutlined
            onClick={showPopconfirm}
            style={{ fontSize: '25px' }}
            key="delete"
          />
        </Popconfirm>,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta title="Card title" description="This is the description" />
      </Skeleton>
    </Card>
  );
};

export default CardComponent;
