import {ProLayout} from '@ant-design/pro-layout';
import {Outlet, useAppData} from '@umijs/max';

import {AvatarDropdown} from '@/components/Header';
import Icon from '@/components/Icon';
import {Context} from '@/holder/Context';
import {I18n} from '@/holder/I18n';
import {Link, SelectLang, useLocation, useModel, useNavigate} from '@@/exports';
import {useIntl} from '@@/plugin-locale';
import {ProLayoutProps} from '@ant-design/pro-components';
import {Route} from '@ant-design/pro-layout/es/typing';
import {App} from 'antd';
import {useEffect, useMemo, useState} from 'react';
import './BasicLayout.css';
import './layout.less';
import Updater from '@/components/Biz/Updater';

export type BasicLayoutProps = {
  overrideProps?: Partial<ProLayoutProps>;
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export default ({overrideProps}: BasicLayoutProps) => {
  const intl = useIntl();
  const {message, notification, modal} = App.useApp();
  I18n.intl = intl;
  I18n.message = message;
  I18n.setNotification(notification);
  I18n.setModal(modal);

  const {loading, user, settings, setLoading, refresh} = useModel('context');
  const {reload} = useModel('dict');

  const rootClassName: string = useMemo(() => {
    const classes: string[] = [];
    if (settings?.inlineScroll) {
      classes.push('layout-scroll-inline');
    }
    if (settings?.headerRender === false) {
      classes.push('layout-header-hidden');
    }
    return classes.join(' ');
  }, [settings?.inlineScroll]);

  const location = useLocation();
  const navigate = useNavigate();

  const [route, setRoute] = useState<Route>();
  const {clientRoutes} = useAppData();

  useEffect(() => {
    // 仅渲染根路径下使用此layout的菜单
    const filter = clientRoutes.filter((r) => r.path === '/');
    if (filter.length > 0) {
      setRoute(filter[0]);
    } else {
      setRoute(clientRoutes[0]);
    }
  }, [clientRoutes]);

  useEffect(() => {
    refresh();
    reload();
  }, []);

  return (
    <ProLayout
      {...settings}
      className={rootClassName}
      route={route}
      location={location}
      formatMessage={intl.formatMessage}
      menu={{}}
      loading={!route || route.length < 1 || loading}
      avatarProps={{
        src: user?.avatar,
        icon: <Icon type={'UserOutline'}/>,
        title: user?.nickname,
        render: (_, avatarChildren) => {
          return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
        },
      }}
      waterMarkProps={
        settings.waterMark
          ? {
            content: user?.username,
          }
          : undefined
      }
      links={[]}
      onPageChange={() => {
        // 如果没有登录，重定向到 login
        if (!user && !loading) {
          Context.logout();
          setLoading(true);
        }
      }}
      onMenuHeaderClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate('/');
      }}
      menuHeaderRender={false}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path && location.pathname !== menuItemProps.path) {
          return (
            // handle wildcard route path, for example /slave/* from qiankun
            <Link to={menuItemProps.path.replace('/*', '')} target={menuItemProps.target}>
              {defaultDom}
            </Link>
          );
        }
        return defaultDom;
      }}
      itemRender={(route, _, routes) => {
        const {breadcrumbName, title, path} = route;
        const label = title || breadcrumbName;
        const last = routes[routes.length - 1];
        if (last) {
          if (last.path === path || ('linkPath' in last && last.linkPath === path)) {
            return <span>{label}</span>;
          }
        }
        return <Link to={path || '/'}>{label}</Link>;
      }}
      actionsRender={() => (
        <SelectLang
          key="SelectLang"
          reload={true}
          style={{
            padding: 4,
          }}
        />
      )}
      {...overrideProps}
    >
      <Updater/>
      <Outlet/>
    </ProLayout>
  );
};
