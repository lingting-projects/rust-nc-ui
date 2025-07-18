import {I18n} from '@/holder/I18n';
import {history} from '@umijs/max';
import {Button, Result} from 'antd';
import React from 'react';

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle={I18n.text('pages.error.404.subTitle')}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {I18n.text('pages.error.404.buttonText')}
      </Button>
    }
  />
);

export default NotFound;
