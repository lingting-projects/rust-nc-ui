import {INFRA} from '@/types/infra';

const wrapper = (key: string) => `nc:${key}`;

const get = (key: string) => localStorage.getItem(wrapper(key));

const set = (key: string, value: string) => localStorage.setItem(wrapper(key), value);

const remove = (key: string) => localStorage.removeItem(wrapper(key));

export class StoreObject {
  key: string;
  value?: string;

  constructor(key: string) {
    this.key = key;
  }

  protected refresh() {
    const sv = get(this.key);
    this.value = sv || undefined;
  }

  get(force: boolean = false) {
    if (force) {
      this.refresh();
    } else if (!this.value) {
      this.refresh();
    }
    return this.value;
  }

  set(value: string, store: boolean = true) {
    this.value = value;
    // 缓存时设置到缓存
    if (store) {
      set(this.key, value);
    }
    // 不缓存时, 移除现有缓存
    else {
      this.remove();
    }
  }

  remove() {
    remove(this.key);
  }
}

export class FixStoreObject extends StoreObject {
  constructor(key: string, value: string) {
    super(key);
    this.value = value;
  }

  protected refresh() {
    //
  }
}

class DictStore {
  clear() {
    const strings = this.codes();
    remove('dict-codes');
    for (let code of strings) {
      const key = `dict:${code}`;
      remove(key);
    }
  }

  codes(): string[] {
    const v = get(`dict-codes`);
    if (!v) {
      return [];
    }

    try {
      return JSON.parse(v) as string[];
    } catch (e) {
      return [];
    }
  }

  from(code: string) {
    const v = get(`dict:${code}`);
    if (!v) {
      return;
    }
    try {
      return JSON.parse(v) as INFRA.DictVO;
    } catch (e) {
      console.debug(`dict parse error! code: ${code}; json: ${v}`, e);
      return;
    }
  }

  save(vo: INFRA.DictVO) {
    const json = JSON.stringify(vo);
    set(`dict:${vo.code}`, json);
    const strings = this.codes();
    if (!strings.includes(vo.code)) {
      strings.push(vo.code);
      set('dict-codes', JSON.stringify(strings));
    }
  }
}

export const Store = {
  wrapper,
  get,
  set,
  remove,
  authorization: new FixStoreObject('authorization', 'lingting-nc'),
  dict: new DictStore(),
};
