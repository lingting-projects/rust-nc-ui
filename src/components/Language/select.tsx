import {LanguageKey, LanguageType, mapLanguage} from '@/components/Language';
import {Select} from 'antd';
import {SelectProps} from 'antd/es/select';
import {DefaultOptionType} from 'rc-select/es/Select';
import * as React from 'react';
import {useMemo} from 'react';

type ValueType = string | LanguageKey;
type OptionType = {
  label: string | React.ReactNode;
  value: ValueType;
  source: LanguageType;
} & DefaultOptionType;

export type LanguageSelectProps = {
  mapOptions?: (option: OptionType) => OptionType | undefined;
} & Omit<React.PropsWithChildren<SelectProps<ValueType, OptionType>>, 'options'>;

const defaultFilterOption: LanguageSelectProps['filterOption'] = (inputValue, option) => {
  const source = option?.source;
  if (!source) {
    return false;
  }
  return (
    source.key.includes(inputValue) ||
    source.key.toLowerCase().includes(inputValue.toLowerCase()) ||
    source.label.includes(inputValue) ||
    source.title.includes(inputValue)
  );
};

export default ({
                  showSearch = true,
                  style,
                  mapOptions,
                  filterOption,
                  ...rest
                }: LanguageSelectProps) => {
  const optionsSource = useMemo(
    () =>
      mapLanguage((l) => ({
        label: `${l.icon} ${l.label}`,
        value: l.key,
        source: l,
      })),
    [],
  );

  const options: OptionType[] = useMemo(() => {
    let value: (OptionType | undefined)[] = [...optionsSource];

    if (mapOptions) {
      optionsSource.forEach((v, i) => {
        value[i] = mapOptions(v);
      });
    }

    return value.filter((o) => typeof o !== 'undefined') as OptionType[];
  }, [mapOptions]);

  const selectFilterOption: LanguageSelectProps['filterOption'] = useMemo(() => {
    if (typeof filterOption === 'undefined') {
      return defaultFilterOption;
    }
    return filterOption;
  }, [filterOption]);

  return (
    <Select<ValueType, OptionType>
      {...rest}
      style={{minWidth: '180px', ...style}}
      options={options}
      showSearch={showSearch}
      filterOption={selectFilterOption}
    />
  );
};
