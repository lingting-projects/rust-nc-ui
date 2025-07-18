import {I18n} from '@/holder/I18n';
import {xw} from '@/util/DocumentUtils';
import {history} from '@@/core/history';
import {stringify} from 'querystring';

export const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';

export const loginPath = '/user/login';

const isLoginPath = () => {
  const {location} = history;
  return location.pathname === loginPath;
};

const toLoginPath = () => {
  if (isLoginPath()) {
    return;
  }
  xw.logoutShow = false;
  const {search, pathname, href} = xw.location;
  const url = new URL(href);
  const urlParams = url.searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect') || pathname + search;
  history.replace({
    pathname: loginPath,
    search: stringify({redirect}),
  });
};

const toRedirect = () => {
  const href = xw.location.href;
  const url = new URL(href);
  const urlParams = url.searchParams;
  const redirect = urlParams.get('redirect');
  history.push(redirect || '/');
};

const logout = (modal: boolean = true) => {
  if (isLoginPath()) {
    return;
  }
  // 不展示modal
  if (!modal) {
    toLoginPath();
    return;
  }
  if (xw.logoutShow) {
    return;
  }
  xw.logoutShow = true;
  I18n.modal.warning({
    title: I18n.text('holder.logout.modal.title'),
    content: I18n.text('holder.logout.modal.content'),
    closable: false,
    keyboard: false,
    okType: 'danger',
    okButtonProps: {
      // 分享页面隐藏ok按钮, 不跳转到登录页
      hidden: xw.queryToken,
    },
    okText: I18n.text('holder.logout.modal.ok'),
    cancelText: I18n.text('holder.logout.modal.cancel'),
    okCancel: true,
    onOk: () => {
      toLoginPath();
    },
    onCancel: () => {
      xw.logoutShow = false;
      xw.location.reload();
    },
    zIndex: 9999999,
  });
};

export const Context = {
  isLoginPath,
  logout,
  toLoginPath,
  toRedirect,
};
