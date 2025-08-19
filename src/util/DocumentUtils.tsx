import { Store } from '@/holder/Store';
import { AUTH_PARAMS } from '@/models/context';
import { XWindow } from '@/typings';
import { isArray } from 'lodash';

export const xw = window as XWindow;

export default {
  /**
   * 页面根路径
   * http://localhost:30000/#/rule -> http://localhost:30000
   * http://localhost:30000/rule -> http://localhost:30000
   * file:///C:/Program%20Files%20(x86)/lingting/lingting-nc/ui/index.html#/rule -> file:///C:/Program%20Files%20(x86)/lingting/lingting-nc
   */
  root() {
    const location = window.location;
    const origin = location.origin;
    if (origin.startsWith('http')) {
      return origin;
    }
    const pathname = location.pathname;
    const path = pathname.substring(0, pathname.lastIndexOf('/'));
    return `${origin}${path}`;
  },
  encode(source?: any) {
    if (source === null || source === undefined) {
      return '';
    }
    const string = `${source}`;
    if (string.length < 1) {
      return string;
    }
    return encodeURIComponent(string);
  },
  urlParams() {
    return new URLSearchParams(window.location.search);
  },
  downloadByBlob(blob: Blob, fileName?: string) {
    const name = fileName || new Date().getTime().toString();
    // @ts-ignore
    if (window.navigator.msSaveOrOpenBlob) {
      // 兼容IE10
      // @ts-ignore
      navigator.msSaveBlob(blob, fileName);
    } else {
      // 创建新的URL表示指定的blob对象
      const href = URL.createObjectURL(blob);
      this.downloadByUrl(href, name);
    }
  },
  downloadByUrl(url: string, fileName?: string) {
    const name = fileName || new Date().getTime().toString();
    // 创建a标签
    const a = document.createElement('a');
    a.style.display = 'none';
    // 指定下载链接
    a.href = url;
    // 指定下载文件名
    a.download = name;
    a.target = '_blank';
    // 触发下载
    a.click();
    // 释放URL对象
    URL.revokeObjectURL(a.href);
  },
  shareUri(uri: string, params?: Record<string, any | any[]>, token: boolean = false) {
    let joinParams: Record<string, any | any[]> = params || {};
    if (token) {
      joinParams[AUTH_PARAMS] = Store.authorization.get();
    }

    if (uri.startsWith('http')) {
      return this.joinUrlParams(uri, joinParams);
    }
    let url = this.root();
    if (!uri.startsWith('/')) {
      url += '/';
    }
    url += uri;
    return this.joinUrlParams(url, joinParams);
  },
  joinUrlParams(url: string, params?: Record<string, any | any[]>, encode: boolean = true) {
    if (!params) {
      return url;
    }
    const names = Object.keys(params);
    if (names.length < 1) {
      return url;
    }
    let join = url;
    if (!join.includes('?')) {
      join += '?';
    }
    names.forEach((k) => {
      const s = params[k];
      const vs = isArray(s) ? s : [s];

      const name = encode ? this.encode(k) : k;

      vs.forEach((v) => {
        const value = encode ? this.encode(v) : v;
        join += `${name}=${value}&`;
      });
    });
    return join;
  },
};
