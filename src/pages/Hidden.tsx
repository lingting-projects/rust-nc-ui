import AntdButton from '@/components/Button/AntdButton';
import { history } from '@umijs/max';
import { Typography } from 'antd';
import React from 'react';

const Hidden: React.FC = () => {
  return (
    <>
      <Typography.Text>隐藏页</Typography.Text>

      <AntdButton text={'回到首页'} onClick={() => history.push('/')} />
    </>
  );
};

export default Hidden;
