import pageSystem from '@/locales/zh-CN/page-system';
import pageUser from '@/locales/zh-CN/page-user';
import utils from '@/locales/zh-CN/utils';
import api from './zh-CN/api';
import component from './zh-CN/component';
import error from './zh-CN/error';
import holder from './zh-CN/holder';
import menu from './zh-CN/menu';
import pageLogin from './zh-CN/page-login';
import pwa from './zh-CN/pwa';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  ...pwa,
  ...api,
  ...menu,
  ...error,
  ...component,
  ...holder,
  ...utils,
  ...pageLogin,
  ...pageSystem,
  ...pageUser,
};
