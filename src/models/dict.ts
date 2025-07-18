import innerDictMap from '@/components/InternalDict';
import {Store} from '@/holder/Store';
import {webInfra} from '@/services/web';
import {DICT_ERROR} from '@/types/constant';
import {INFRA} from '@/types/infra';
import BooleanUtils from '@/util/BooleanUtils';
import {useCallback, useState} from 'react';

// @ts-ignore
const w: typeof window & {
  [key: string]: 'yes' | 'no' | 'loading';
} = window;

const transformValue = (type: INFRA.DictValueType, source: string): any => {
  if (type === 'STRING') {
    return source;
  }
  if (type === 'NUMBER') {
    return Number(source);
  }
  if (!source || source.length < 1) {
    return false;
  }

  return BooleanUtils.isTrue(source);
};

const loadByRemote = async (codes: string[]) => {
  if (!codes || codes.length < 1) {
    return Promise.resolve([]);
  }
  try {
    return await webInfra.dictList({codes}, {skipErrorHandler: true});
  } catch {
    return [];
  }
};

const loadByInner = (codes: string[]) => {
  const array: INFRA.DictVO[] = [];
  codes.forEach((code) => {
    const vo = innerDictMap[code];
    if (vo) {
      array.push(vo);
    }
  });
  return array;
};

export default () => {
  /**
   * key: {@link INFRA.DictVO#code}
   */
  const [map, setMap] = useState<Record<string, INFRA.DictVO | undefined>>({});

  const load = useCallback((codes: string[], force: boolean = false) => {
    return new Promise<INFRA.DictVO[]>((resolve) => {
      const array: INFRA.DictVO[] = [];
      const readyCodes: string[] = [];
      // inner
      const inner = loadByInner(codes);
      inner.forEach((i) => {
        array.push(i);
        readyCodes.push(i.code);
      });
      // store
      if (!force) {
        const storeCodes = codes.filter((v) => !readyCodes.includes(v));
        const dict = Store.dict;

        for (let code of storeCodes) {
          const from = map[code] || dict.from(code);
          if (from) {
            map[code] = from;
            array.push(from);
            readyCodes.push(code);
          }
        }
      }

      // remote
      const remoteCodes = codes.filter((v) => !readyCodes.includes(v));
      loadByRemote(remoteCodes)
        .then((vos) => {
          if (!vos || vos.length < 1) {
            return;
          }
          const dict = Store.dict;
          for (let vo of vos) {
            array.push(vo);
            readyCodes.push(vo.code);
            map[vo.code] = vo;
            dict.save(vo);
          }
        })
        .finally(() => {
          const result = array.map((vo) => {
            vo.items = vo.items.map((item) => {
              const internal = item._internal || {};
              item._internal = internal;
              internal.data = transformValue(vo.valueType, item.value);
              internal.disabled = item.status === 'DISABLE';
              return item;
            });
            return vo;
          });
          resolve(result);
        });
    });
  }, []);

  const refresh = useCallback((codes: string[]) => {
    load(codes, true).then(() => {
      //
    });
  }, []);

  const from = useCallback(
    (code: string, force: boolean = false) =>
      new Promise<INFRA.DictVO>((resolve) => {
        const fromMap = map[code];
        if (!force && fromMap) {
          resolve(fromMap);
          return;
        }

        const key = `dict-${code}`;
        if (w[key] === 'loading') {
          const i = setInterval(() => {
            if (w[key] !== 'loading') {
              from(code).then(resolve);
              clearInterval(i);
            }
          }, 300);
          return;
        }

        load([code], force).then((vos) => {
          if (!vos || vos.length < 1) {
            resolve(DICT_ERROR);
            return;
          }
          resolve(vos[0]);
        });
      }),
    [map],
  );

  const clear = useCallback(() => {
    setMap({});
    Store.dict.clear();
  }, []);

  const reload = useCallback(() => {
    const store = Store.dict;
    const codes = store.codes();
    refresh(codes);
  }, []);

  return {reload, from, clear, refresh};
};
