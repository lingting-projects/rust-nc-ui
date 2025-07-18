import * as rawAntdIcons from '@ant-design/icons';
import * as rawAntdMobileIcons from 'antd-mobile-icons';
import React from 'react';

export type AntdIconKeys = Omit<
  typeof rawAntdIcons,
  'default' | 'createFromIconfontCN' | 'getTwoToneColor' | 'setTwoToneColor'
>;

export type AntdMobileIconKeys = Omit<
  typeof rawAntdMobileIcons,
  'default' | 'getTwoToneColor' | 'setTwoToneColor'
>;

export type AntdKeys = keyof AntdIconKeys;

export type AntdMobileKeys = keyof AntdMobileIconKeys;

export type IconKeys = AntdKeys | AntdMobileKeys | string;

export type IconComponent = React.FC;

// @ts-ignore
const antdIcons: Record<IconKeys, IconComponent> = rawAntdIcons;

const antdMobileIcons: Record<IconKeys, IconComponent> = rawAntdMobileIcons;

const icons: Record<IconKeys, IconComponent> = {
  ...antdIcons,
  ...antdMobileIcons,
};

const suffixArray = ['Outlined', 'Filled', 'TwoTone'];

const from = (key: IconKeys, source: Record<IconKeys, IconComponent>) => {
  if (source[key]) {
    return source[key];
  }

  const upper = (key.substring(0, 1).toUpperCase() + key.substring(1)) as IconKeys;
  if (source[upper]) {
    return source[upper];
  }
  for (let suffix of suffixArray) {
    const tag = `${upper}${suffix}` as IconKeys;
    if (source[tag]) {
      return source[tag];
    }
  }
};

export const getComponent = (key: IconKeys): IconComponent | undefined => {
  const antd = from(key, antdIcons);
  if (antd) {
    return antd;
  }
  return from(key, antdMobileIcons);
};

export default icons;
