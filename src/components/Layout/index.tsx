import {App} from 'antd';
import AntDesignProLayout, {BasicLayoutProps} from './BasicLayout';

export * from './BasicLayout';

export default (props: BasicLayoutProps) => (
  <App className={'layout-app'}>
    <AntDesignProLayout {...props} />
  </App>
);
