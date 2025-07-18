import Api from '@/holder/Api';
import {Context} from '@/holder/Context';
import {I18n} from '@/holder/I18n';
import {Store} from '@/holder/Store';
import {AUTH_HEADER} from '@/models/context';
import {R} from '@/types/global';
import type {RequestOptions} from '@@/plugin-request/request';
import type {RequestConfig} from '@umijs/max';

// 错误处理方案： 错误类型
enum ErrorShowType {
  // 不处理
  SILENT = 0,
  // 警告消息
  WARN_MESSAGE = 1,
  // 异常消息
  ERROR_MESSAGE = 2,
  // 右侧通知
  NOTIFICATION = 3,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handlerHeaders = (source: any | undefined) => {
  const headers: Record<string, any> = {};
  // 非登录页添加 鉴权信息
  if (!Context.isLoginPath()) {
    const authorization = Store.authorization.get();
    if (authorization) {
      headers[AUTH_HEADER] = authorization;
    }
  }

  headers['Accept-Language'] = I18n.getLocale();
  headers['X-Trace-Time'] = new Date().getTime();

  return headers;
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      let code: number | undefined;
      let text: string | undefined;
      const response = error.response;
      const request = error.request || response?.request;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const r: R | undefined = error.info;
        if (r) {
          code = r.code;
          text = r.message;
        }
      }
      // 服务端返回请求状态码不是 200
      else if (response) {
        code = response.status;
        text = response.statusText;
      }
      // 没有返回值
      else if (request) {
        text = 'None response! Please retry.';
      }

      code = code || error.code || -1;
      text = text || error.message || 'Request error, please retry.';

      let showType: ErrorShowType;
      if (code === undefined || code === 200) {
        showType = ErrorShowType.SILENT;
      } else if (code === 401 || code === 403) {
        showType = ErrorShowType.NOTIFICATION;
      } else if (code < 600) {
        showType = ErrorShowType.ERROR_MESSAGE;
      } else {
        showType = ErrorShowType.WARN_MESSAGE;
      }

      // 登录页全隐藏, 交由登录流程控制
      if (Context.isLoginPath()) {
        showType = ErrorShowType.SILENT;
      }

      const traceId = (response?.headers && response?.headers['X-TraceId']) || '';
      console.error('Request error!', request?.responseURL, traceId, code, text);

      switch (showType) {
        case ErrorShowType.WARN_MESSAGE:
          I18n.warning(text);
          break;
        case ErrorShowType.ERROR_MESSAGE:
          I18n.error(text);
          break;
        case ErrorShowType.NOTIFICATION:
          I18n.notification.error({
            description: text,
            message: code,
          });
          break;
        case ErrorShowType.SILENT:
        default:
          break;
      }
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = Api.joinPrefix(config?.url);
      const headers = handlerHeaders(config?.headers);
      return {
        ...config,
        url,
        headers,
      };
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const headers = response?.headers;
      const header = (headers && headers['content-type']) || '';
      if (header.includes('application/json')) {
        /*
        如果使用 errorConfig.errorThrower 那么umi只会在 data.success = false 时触发
        不想修改数据结构, 而且 errorThrower 中抛出的异常没法获取到request信息, 所以在这里进行 code!=200时的异常抛出
         */
        const {code, data, message} = response.data as R;
        if (code !== 200) {
          const error: any = new Error(message);
          error.name = 'BizError';
          error.info = {code, message, data};
          error.response = response;
          // 抛出自制的错误
          throw error;
        }
      }
      return response;
    },
  ],
};
