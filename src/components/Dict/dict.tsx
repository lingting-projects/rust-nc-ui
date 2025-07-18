import {InnerDictCodes} from '@/components/InternalDict';
import {I18n} from '@/holder/I18n';
import {DICT_ERROR} from '@/types/constant';
import {INFRA} from '@/types/infra';
import {useModel} from '@@/exports';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

export type DictKeys =
  | InnerDictCodes
  | 'DictValueTypeDict'
  | 'DictStatusDict'
  | 'UserStatusDict'
  | 'UserMainDict'
  | 'SecurityScopeFromDict';

export type DictRenderParams = {
  loading: boolean;
  dict: Omit<INFRA.DictVO, 'items'>;
  items: INFRA.DictItemVO[];
};

export type DictProps = {
  code: string | DictKeys;
  hiddenDisable?: boolean;
  render: (params: DictRenderParams) => React.ReactNode;
  filter?: (vo: INFRA.DictItemVO) => boolean;
  labelProps?: Record<string, any>;
};

export const InternalDict: React.FC<DictProps> = ({
                                                    code,
                                                    render,
                                                    hiddenDisable,
                                                    filter,
                                                    labelProps,
                                                  }: DictProps) => {
  const {from} = useModel('dict');

  const [loading, setLoading] = useState<boolean>(true);
  const [vo, setVo] = useState(DICT_ERROR);

  const items = useMemo(() => {
    if (loading) {
      return [];
    }
    return (vo.items as INFRA.DictItemVO[])
      .filter((item) => {
        if (hiddenDisable && item._internal?.disabled) {
          return false;
        }

        return filter ? filter(item) : true;
      })
      .map((item) => {
        const locale = I18n.getLocale();
        const text = (item.i18n && item.i18n[locale]) || item.value;
        const internal = item._internal || {};
        item._internal = internal;
        if (internal?.renderLabel && typeof internal?.renderLabel === 'function') {
          internal.label = internal.renderLabel(text, labelProps);
        } else {
          internal.label = text;
        }
        return item;
      });
  }, [loading, vo, filter, labelProps]);

  useEffect(() => {
    setLoading(true);
    from(code)
      .then(setVo)
      .finally(() => setLoading(false));
  }, [code]);

  return render({loading, dict: vo, items});
};

export type SingleDictRenderParams<V> = DictRenderParams & {
  pick?: INFRA.DictItemVO;
  onChange: (v?: V) => void;
};

export type SingleDictProps<V = any> = {
  value?: V;
  onChange?: (v?: V) => void;
  render: (params: SingleDictRenderParams<V>) => React.ReactNode;
} & Omit<DictProps, 'render'>;

export const SingleDict = <V = any, >({value, onChange, render, ...props}: SingleDictProps<V>) => {
  const [state, setState] = useState<V | undefined>(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  const on = useCallback(
    (v?: V) => {
      setState(v);
      if (onChange) {
        onChange(v);
      }
    },
    [onChange],
  );

  return (
    <InternalDict
      {...props}
      render={(params) => {
        const {loading, items} = params;
        if (loading) {
          return render({
            ...params,
            onChange: on,
          });
        }
        const find = items.find((item) => item._internal?.data === state);
        return render({...params, pick: find, onChange: on});
      }}
    />
  );
};

export type MultipleDictRenderParams<V = any> = DictRenderParams & {
  pick: INFRA.DictItemVO[];
  onChange: (v: V[]) => void;
};

export type MultipleDictProps<V = any> = {
  value?: V[];
  onChange?: (v: V[]) => void;
  render: (params: MultipleDictRenderParams) => React.ReactNode;
} & Omit<DictProps, 'render'>;

const toMultiple = <E, >(v?: E | E[]): E[] => {
  if (v === null || typeof v === 'undefined') {
    return [] as E[];
  }
  // @ts-ignore
  if (typeof v.includes === 'function') {
    return v as E[];
  }
  return [v] as E[];
};

export const MultipleDict = <V = any, >({
                                          value,
                                          onChange,
                                          render,
                                          ...props
                                        }: MultipleDictProps<V>) => {
  const [state, setState] = useState<V[]>(value || []);

  useEffect(() => {
    const v = toMultiple(value);
    setState(v);
  }, [value]);

  const on = useCallback(
    (v?: V[]) => {
      const s = toMultiple(v);
      setState(s);
      if (onChange) {
        onChange(s);
      }
    },
    [onChange],
  );

  return (
    <InternalDict
      {...props}
      render={(params) => {
        const {loading, items} = params;
        if (loading) {
          return render({
            ...params,
            onChange: on,
            pick: [],
          });
        }
        const filter = items.filter((item) => state.includes(item._internal?.data));
        return render({
          ...params,
          pick: filter,
          onChange: on,
        });
      }}
    />
  );
};
