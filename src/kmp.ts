import {request as requestConfig} from '@/request';
import {R} from '@/types/global';
import {AxiosRequestConfig} from 'axios';

export const request = <T>(target: string, config: AxiosRequestConfig) => {
  return new Promise<R<T>>((resolve, reject) => {
    const rJson = {
      uri: target,
      method: config.method!!.toUpperCase(),
      params: config.params,
      data: config.data,
    };
    let onFailure = (code: number, message: string) => {
      let r = {code, message};
      if (requestConfig?.errorConfig?.errorHandler) {
        const error: any = new Error(message);
        error.name = 'BizError';
        error.info = r;
        requestConfig.errorConfig.errorHandler(error, {});
      }
      reject(r);
    };
    // @ts-ignore
    window.kmp({
      request: JSON.stringify(rJson),
      persistent: false,
      onSuccess: (v: string) => {
        const r = JSON.parse(v) as R<T>;
        if (r.code !== 200) {
          onFailure(r.code, r.message);
        } else {
          resolve(r);
        }
      },
      onFailure,
    });
  });
};
