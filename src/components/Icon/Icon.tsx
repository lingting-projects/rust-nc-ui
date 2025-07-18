import {getComponent, IconKeys} from '@/components/Icon';
import {ExclamationCircleTwoTone, LoadingOutlined} from '@ant-design/icons';
import {AntdIconProps} from '@ant-design/icons/lib/components/AntdIcon';
import {theme} from 'antd';
import React, {useMemo} from 'react';

export type IconBasicProps = Omit<
  AntdIconProps,
  'onPointerEnterCapture' | 'onPointerLeaveCapture' | 'ref'
>;

export const Error = (props: IconBasicProps) => {
  const {token} = theme.useToken();

  return (
    // @ts-ignore
    <ExclamationCircleTwoTone twoToneColor={token.colorError} {...props} />
  );
};

export const Loading = ({style, ...props}: IconBasicProps) => {
  const {token} = theme.useToken();

  return (
    // @ts-ignore
    <LoadingOutlined {...props} style={{color: token.colorPrimary, ...style}}/>
  );
};

export type IconProps = {
  type: IconKeys | string;
  color?: 'primary' | 'danger' | 'link' | 'text' | React.CSSProperties['color'];
  styles?: Omit<React.CSSProperties, 'color'>;
} & IconBasicProps;

const Icon = ({type, hidden, color, style, ...props}: IconProps) => {
  const {token} = theme.useToken();
  const Component = useMemo(() => getComponent(type), [type]);
  const iconStyle = useMemo(() => {
    if (!color) {
      return style;
    }

    let value = color;
    if (color === 'primary') {
      value = token.colorPrimary;
    } else if (color === 'danger') {
      value = token.colorError;
    } else if (color === 'link') {
      value = token.colorLink;
    } else if (color === 'text') {
      value = token.colorText;
    }

    return {...style, color: value};
  }, [color, style]);

  if (hidden) {
    return;
  }

  if (Component) {
    // @ts-ignore
    return <Component {...props} style={iconStyle}/>;
  }

  return <Error/>;
};

export default Icon;
