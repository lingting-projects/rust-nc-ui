import Icon from '@/components/Icon';
import {I18n, I18nKeys} from '@/holder/I18n';
import {Button, ButtonProps as AntdButtonProps, Popconfirm, Tooltip, Typography} from 'antd';
import {PopconfirmProps} from 'antd/es/popconfirm';
import {TooltipProps} from 'antd/es/tooltip';
import {LinkProps} from 'antd/es/typography/Link';
import {TextProps} from 'antd/es/typography/Text';
import React, {useEffect, useMemo} from 'react';

export type ButtonType = 'button' | 'text' | 'link';

export type ButtonText = string | I18nKeys;

export type ButtonRenderProps<P = Record<string, any>> = {
  text?: string;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  props?: P;
};

export type ButtonProps<P> = {
  type: ButtonType;
  text?: ButtonText;
  confirm?: false | ButtonText | Omit<PopconfirmProps, 'onConfirm'>;
  tooltip?: false | ButtonText | TooltipProps;
  loading?: boolean;
} & Omit<ButtonRenderProps<P>, 'text' | 'loading'>;

const renderButton = ({
                        text,
                        danger,
                        disabled,
                        loading,
                        onClick,
                        props,
                      }: ButtonRenderProps<AntdButtonProps>) => {
  return (
    <Button {...props} loading={loading} danger={danger} disabled={disabled} onClick={onClick}>
      {text}
    </Button>
  );
};

const renderText = ({
                      text,
                      danger,
                      disabled,
                      loading,
                      onClick,
                      props,
                    }: ButtonRenderProps<TextProps>) => {
  return (
    <Typography.Text
      {...props}
      type={danger ? 'danger' : props?.type}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {text}
      {loading && <Icon type={'LoadingOutlined'}/>}
    </Typography.Text>
  );
};

const renderLink = ({
                      text,
                      danger,
                      disabled,
                      loading,
                      onClick,
                      props,
                    }: ButtonRenderProps<LinkProps>) => {
  return (
    <Typography.Link
      {...props}
      type={danger ? 'danger' : props?.type}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {text}
      {loading && <Icon type={'LoadingOutlined'}/>}
    </Typography.Link>
  );
};

const wrapperConfirm = (
  dom: React.ReactNode,
  confirm: ButtonProps<any>['confirm'],
  onClick: ButtonProps<any>['onClick'],
) => {
  if (!confirm) {
    return dom;
  }

  const props =
    typeof confirm === 'string'
      ? {
        title: I18n.text(confirm),
      }
      : confirm;

  return (
    <Popconfirm
      {...props}
      okText={props?.okText || I18n.text('component.button.confirm.yes')}
      cancelText={props?.cancelText || I18n.text('component.button.confirm.no')}
      onConfirm={onClick}
    >
      {dom}
    </Popconfirm>
  );
};

const wrapperTooltip = (dom: React.ReactNode, tooltip: ButtonProps<any>['tooltip']) => {
  if (!tooltip) {
    return dom;
  }

  const props =
    typeof tooltip === 'string'
      ? {
        title: I18n.text(tooltip),
      }
      : tooltip;

  return <Tooltip {...props}>{dom}</Tooltip>;
};

const InternalButton = <P = any, >({
                                     type,
                                     text,
                                     danger,
                                     disabled,
                                     loading,
                                     onClick,
                                     confirm,
                                     tooltip,
                                     props,
                                   }: ButtonProps<P>) => {
  const showText = useMemo(() => (text ? I18n.text(text) : text), [text]);

  const dom = useMemo(() => {
    const params = {
      text: showText,
      danger,
      disabled,
      loading,
      onClick: confirm ? undefined : onClick,
      props,
    };
    if (type === 'button') {
      // @ts-ignore
      return renderButton(params);
    }
    if (type === 'link') {
      // @ts-ignore
      return renderLink(params);
    }
    // @ts-ignore
    return renderText(params);
  }, [type, showText, danger, disabled, onClick, confirm, props]);

  const confirmDom = useMemo(() => wrapperConfirm(dom, confirm, onClick), [confirm, dom, onClick]);

  const tooltipDom = useMemo(() => wrapperTooltip(confirmDom, tooltip), [tooltip, confirmDom]);

  useEffect(() => {
  }, []);

  return tooltipDom;
};

export default InternalButton;
