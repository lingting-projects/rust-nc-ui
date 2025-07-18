import Dict, {CheckboxDictProps, DictProps, SelectDictProps} from '@/components/Dict';
import {SingleDictProps} from '@/components/Dict/dict';
import {I18n} from '@/holder/I18n';
import {Space, Typography} from 'antd';
import React, {useMemo} from 'react';
import countries from './countries';
import './index.css';

export type AreaCode = keyof typeof countries | string;

export type Area = {
  name: string;
  enName: string;
  localName: string;
  code: AreaCode;
  dialCode: string;
  phoneFormat: string;
};

export type AreaLabelProps = {
  area: Area;
  flag?: boolean;
  dial?: boolean;
  local?: boolean;
};

export const AreaLabel = ({area, flag = true, dial, local}: AreaLabelProps) => {
  const name = useMemo(() => (I18n.isChina() ? area.name : area.enName), [area]);
  const array = useMemo(() => {
    const r: React.ReactNode[] = [];
    if (flag) {
      r.push(
        <div key={`area-flag-${area.code}`} className={`iti-flag ${area.code.toLowerCase()}`}/>,
      );
    }
    if (dial) {
      r.push(<Typography.Text key={`area-dial-${area.code}`}>+{area.dialCode}</Typography.Text>);
    }
    r.push(<Typography.Text key={`area-name-${area.code}`}>{name}</Typography.Text>);
    if (local) {
      r.push(<Typography.Text key={`area-local-${area.code}`}>{area.localName}</Typography.Text>);
    }
    return r;
  }, [area, name, flag, dial, local]);

  return <Space>{array}</Space>;
};

export type AreaDictProps = Omit<DictProps, 'code' | 'render' | 'labelProps'> & {
  labelProps?: Omit<AreaLabelProps, 'area'>;
};

export type AreaSingleDictProps = AreaDictProps &
  Omit<SingleDictProps<string>, 'code' | 'render'> & {
  type: 'radio' | 'tag' | 'text';
};

export const AreaSingleDict = ({type, ...props}: AreaSingleDictProps) => {
  const Component = useMemo(() => {
    if (type === 'radio') {
      return Dict.Radio;
    }
    if (type === 'tag') {
      return Dict.Tag;
    }
    return Dict.Text;
  }, [type]);

  return <Component {...props} code={'AreaDict'}/>;
};

export type AreaMultipleDictProps = AreaDictProps &
  Omit<SingleDictProps<string>, 'code' | 'render'> & {
  type: 'checkbox' | 'select';
} & Pick<CheckboxDictProps, 'props'> &
  Pick<SelectDictProps, 'props'>;

export const AreaMultipleDict = ({type, ...props}: AreaMultipleDictProps) => {
  const Component = useMemo(() => {
    if (type === 'checkbox') {
      return Dict.CheckBox;
    }
    return Dict.Select;
  }, [type]);

  const innerProps = useMemo(() => {
    if (type === 'checkbox') {
      return {};
    }
    return {mode: 'multiple'};
  }, [type]);

  // @ts-ignore
  return <Component {...props} props={{...props?.props, ...innerProps}} code={'AreaDict'}/>;
};
