import pageSystem from '@/locales/en-US/page-system';
import pageUser from '@/locales/en-US/page-user';
import utils from '@/locales/en-US/utils';
import api from './en-US/api';
import component from './en-US/component';
import error from './en-US/error';
import holder from './en-US/holder';
import menu from './en-US/menu';
import pageLogin from './en-US/page-login';
import pwa from './en-US/pwa';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
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
