import zhCN from '@/locales/zh-CN';
import {setLocale} from '@@/exports';
import {getAllLocales} from '@@/plugin-locale';
import {message as Message, Modal, ModalFuncProps, notification as Notification} from 'antd';
import {
  JointContent,
  ArgsProps as MessageArgsProps,
  MessageInstance,
  MessageType,
  NoticeType,
} from 'antd/es/message/interface';
import {ModalFunc} from 'antd/es/modal/confirm';
import type {HookAPI as ModalHookAPI} from 'antd/es/modal/useModal';
import type {NotificationInstance} from 'antd/es/notification/interface';
import {ArgsProps as NotificationArgsProps} from 'antd/lib/notification';
import {FormatXMLElementFn, PrimitiveType} from 'intl-messageformat';
import React from 'react';
import {IntlShape, MessageDescriptor} from 'react-intl';
import settings from '../../config/settings';

type Params<V> =
  | string
  | {
  id: string | I18nKeys;
  description?: string | object;
  defaultMessage?: string;
  values?: V;
};

export type I18nKeys = keyof typeof zhCN;

export type TextParams = Params<Record<string, PrimitiveType>> | I18nKeys;

export type NodeParams = Params<
  Record<string, PrimitiveType | React.ReactElement | FormatXMLElementFn<any>>
>;

export type MessageParams = {
  content: JointContent | TextParams;
  duration?: number;
  onClose?: VoidFunction;
};

const pick = <V>(params: Params<V>) => {
  if (!settings.i18n) {
    setLocale(settings.defaultLocale);
  }
  const desc: MessageDescriptor = {};
  let values: V | undefined = undefined;
  if (typeof params === 'string') {
    desc.id = params;
    desc.defaultMessage = params;
  } else {
    desc.id = params.id;
    desc.description = params.description;
    desc.defaultMessage = params.defaultMessage;
    values = params.values;
  }
  return {desc, values};
};

class NotificationImpl implements NotificationInstance {
  impl: NotificationInstance = Notification;

  success(args: NotificationArgsProps) {
    this.impl.success(args);
  }

  error(args: NotificationArgsProps) {
    this.impl.error(args);
  }

  info(args: NotificationArgsProps) {
    this.impl.info(args);
  }

  warning(args: NotificationArgsProps) {
    this.impl.warning(args);
  }

  open(args: NotificationArgsProps) {
    this.impl.open(args);
  }

  destroy(key?: React.Key | undefined): void {
    this.impl.destroy(key);
  }
}

class ModalImpl {
  impl: ModalHookAPI | typeof Modal = Modal;

  info(args: ModalFuncProps): ReturnType<ModalFunc> {
    return this.impl.info(args);
  }

  success(args: ModalFuncProps): ReturnType<ModalFunc> {
    return this.impl.success(args);
  }

  error(args: ModalFuncProps): ReturnType<ModalFunc> {
    return this.impl.error(args);
  }

  warning(args: ModalFuncProps): ReturnType<ModalFunc> {
    return this.impl.warning(args);
  }

  confirm(args: ModalFuncProps): ReturnType<ModalFunc> {
    return this.impl.confirm(args);
  }
}

class I18nImpl {
  intl: IntlShape | undefined;

  message: MessageInstance = Message;

  notification = new NotificationImpl();

  modal = new ModalImpl();

  getLocale() {
    if (!settings.i18n) {
      setLocale(settings.defaultLocale);
      return settings.defaultLocale;
    }
    return this.intl?.locale || localStorage.getItem('umi_locale') || settings.defaultLocale;
  }

  getLocales() {
    const locales = getAllLocales();
    const locale = this.getLocale();
    if (!locales.includes(locale)) {
      locales.push(locale);
    }
    return locales;
  }

  isChina() {
    const locale = this.getLocale();
    return 'zh-CN' === locale || locale.startsWith('zh');
  }

  setNotification(value: NotificationInstance) {
    this.notification.impl = value;
  }

  setModal(value: ModalHookAPI) {
    this.modal.impl = value;
  }

  text(params: TextParams) {
    const {desc, values} = pick(params);
    const id = desc.id;
    if (!this.intl) {
      return id ? `${id}` : '';
    }
    // 提前过滤掉不存在的国际化
    if (id && typeof id === 'string') {
      const cache = this.intl.messages[id];
      if (!cache) {
        return desc.defaultMessage || id;
      }
    }
    return this.intl.formatMessage(desc, values);
  }

  node(params: NodeParams) {
    const {desc, values} = pick(params);
    if (!this.intl) {
      return desc.id ? `${desc.id}` : '';
    }
    return this.intl.formatMessage(desc, values);
  }

  open(
    args: Omit<MessageArgsProps, 'content'> & { content: JointContent | TextParams },
  ): MessageType {
    const s = this.convert(args.content);
    return this.message.open({
      ...args,
      content: s && typeof s === 'object' && 'content' in s ? s.content : (s as any),
    });
  }

  destroy(key?: React.Key) {
    this.message.destroy(key);
  }

  protected convert(content: JointContent | TextParams): JointContent {
    if (!content) {
      return content;
    }
    if (typeof content === 'string') {
      return {
        content: this.text(content),
      };
    }
    if (typeof content !== 'object') {
      return content;
    }
    if ('id' in content && content.id) {
      return {
        content: this.text(content),
      };
    }
    return content as JointContent;
  }

  info(
    content: JointContent | TextParams,
    duration?: number | VoidFunction,
    onClose?: VoidFunction,
  ) {
    return this.message.info(this.convert(content), duration, onClose);
  }

  success(
    content: JointContent | TextParams,
    duration?: number | VoidFunction,
    onClose?: VoidFunction,
  ) {
    return this.message.success(this.convert(content), duration, onClose);
  }

  error(
    content: JointContent | TextParams,
    duration?: number | VoidFunction,
    onClose?: VoidFunction,
  ) {
    return this.message.error(this.convert(content), duration, onClose);
  }

  warning(
    content: JointContent | TextParams,
    duration?: number | VoidFunction,
    onClose?: VoidFunction,
  ) {
    return this.message.warning(this.convert(content), duration, onClose);
  }

  loading(
    content: JointContent | TextParams,
    duration?: number | VoidFunction,
    onClose?: VoidFunction,
  ) {
    return this.message.loading(this.convert(content), duration, onClose);
  }

  protected wrapper(p: TextParams | MessageParams): MessageParams {
    if (typeof p === 'string') {
      return {content: p};
    }
    if ('content' in p) {
      return {...p};
    }
    return {content: p};
  }

  protected innerOpen(type: NoticeType, {content, duration, onClose}: MessageParams) {
    return this.open({
      type,
      content,
      duration,
      onClose,
    });
  }

  async async<T>(
    promise: Promise<T>,
    loading?: TextParams | MessageParams,
    success?: TextParams | MessageParams,
    error?: TextParams | MessageParams,
  ) {
    const lMessage = loading ? this.innerOpen('loading', this.wrapper(loading)) : undefined;
    promise
      .then(() => {
        if (lMessage && success) {
          this.innerOpen('success', this.wrapper(success));
        }
      })
      .catch(() => {
        if (lMessage && error) {
          this.innerOpen('error', this.wrapper(error));
        }
      })
      .finally(() => {
        if (lMessage) {
          lMessage();
        }
      });
  }
}

export const I18n = new I18nImpl();
