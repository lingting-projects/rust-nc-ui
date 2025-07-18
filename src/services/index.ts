import {request as kmp} from '@/kmp';
import {R} from '@/types/global';
import {request as axios} from '@@/exports';
import {AxiosRequestConfig} from 'axios';

export type Options = Omit<AxiosRequestConfig, 'params' | 'data' | 'url'> & {
  skipErrorHandler?: boolean;
};

const join = (prefix: string | undefined, url: string) => {
  let u = url;
  if (!u.startsWith('/')) {
    u = `/${u}`;
  }

  if (!prefix || prefix.length < 1) {
    return u;
  }

  let p = prefix;
  if (p.endsWith('/')) {
    p = p.substring(0, p.length - 1);
  }
  if (p.startsWith('/')) {
    p = p.substring(1);
  }
  return `${p}${u}`;
};

export class Request {
  prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  request = async <T = void>(
    method: 'get' | 'post' | 'patch' | 'delete' | 'put' | 'head' = 'get',
    url: string,
    params: any = undefined,
    data: any = undefined,
    options: Options = {},
  ) => {
    const target = join(this.prefix, url);
    const config: AxiosRequestConfig = {
      ...options,
      method,
      params,
      data,
    };

    const r = await (process.env?.kmp ? kmp<T>(target, config) : axios<R<T>>(target, config));
    return r.data;
  };

  get = async <T = void>(url: string, params: any = undefined, options: Options = {}) => {
    return this.request<T>('get', url, params, undefined, options);
  };

  post = async <T = void>(
    url: string,
    data: any = undefined,
    params: any = undefined,
    options: Options = {},
  ) => {
    return this.request<T>('post', url, params, data, options);
  };

  put = async <T = void>(
    url: string,
    data: any = undefined,
    params: any = undefined,
    options: Options = {},
  ) => {
    return this.request<T>('put', url, params, data, options);
  };

  patch = async <T = void>(
    url: string,
    data: any = undefined,
    params: any = undefined,
    options: Options = {},
  ) => {
    return this.request<T>('patch', url, params, data, options);
  };
}

export default new Request();
