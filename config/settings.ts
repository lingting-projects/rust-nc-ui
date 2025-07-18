import {ProLayoutProps} from '@ant-design/pro-components';

export type SettingsType = ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
  defaultLocale: string;
  i18n: boolean;
  waterMark: boolean;
  // 内置滚动条, 当main过长时使用浏览器自带的滚动条. 滚动条常态占位, 避免部分情况下页面闪烁
  inlineScroll?: boolean;
  historyType: 'browser' | 'hash' | 'memory';
};

/**
 * @name
 */
const Settings: SettingsType = {
  siderWidth: 256,
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  headerRender: false,
  fixSiderbar: true,
  colorWeak: false,
  historyType: 'hash',
  title: 'Nc',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
  pwa: true,
  logo: '/256x256.svg',
  defaultLocale: 'zh-CN',
  i18n: true,
  waterMark: false,
  inlineScroll: true,
};

export default Settings;
