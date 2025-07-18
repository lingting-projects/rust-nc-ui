import {StoreObject} from '@/holder/Store';
import {XWindow} from '@/typings';

const x = window as XWindow;
let prefixEnv = process.env?.requestPrefix;
const obj = new StoreObject('requestPrefix');
let prefixStore = obj.get();

if (!prefixStore && prefixEnv) {
  obj.set(prefixEnv);
}

x.setRequestPrefix = (target?: string) => {
  obj.set(target || '', false);
};

export default {
  joinPrefix(uri?: string): string {
    const prefix = obj.get();
    if (!prefix || prefix.length < 1) {
      return uri || '';
    }
    let url = prefix;
    if (!uri) {
      return url;
    }
    if (!uri.startsWith('/')) {
      url = `${url}/`;
    }
    return url + uri;
  },
};
