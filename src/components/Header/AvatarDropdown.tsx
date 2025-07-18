import Icon from '@/components/Icon';
import {Context} from '@/holder/Context';
import {upmsLogin} from '@/services/upms';
import {history, useModel} from '@umijs/max';
import {Spin} from 'antd';
import {createStyles} from 'antd-style';
import type {MenuInfo} from 'rc-menu/lib/interface';
import React, {useCallback} from 'react';
import {flushSync} from 'react-dom';
import HeaderDropdown from './HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

const useStyles = createStyles(({token}) => {
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({children}) => {
  const {styles} = useStyles();

  const {user, setUser} = useModel('context', ({user, setUser}) => ({user, setUser}));

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const {key} = event;
      if (key === 'logout') {
        flushSync(() => {
          setUser(undefined);
        });
        upmsLogin.logout().then(() => {
          Context.logout(false);
        });
        return;
      }
      history.push(`/account/${key}`);
    },
    [setUser],
  );

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!user) {
    return loading;
  }

  const menuItems: any  [] = [
    {
      key: 'logout',
      icon: <Icon type={'LogoutOutlined'}/>,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
