import Icon from '@/components/Icon';
import {INFRA} from '@/types/infra';
import {Select} from 'antd';
import {SelectProps} from 'antd/es/select';
import {isArray} from 'lodash';
import {BaseOptionType, DefaultOptionType} from 'rc-select/es/Select';
import {MultipleDict, MultipleDictProps} from './dict';

export type SelectDictProps<
  V = any,
  O extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> = {
  value?: V | V[];
  onChange?: (v: V | V[]) => void;
  props?: Omit<SelectProps<V, O>, 'value' | 'onChange' | 'options'>;
  optionsRender?: (items: INFRA.DictItemVO[]) => SelectProps<V, O>['options'];
} & Omit<MultipleDictProps, 'render' | 'value' | 'onChange'>;

const SelectDict = <
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>({
    value,
    props,
    optionsRender = (items) =>
      items.map(
        (item) =>
          ({
            label: item._internal?.label,
            value: item._internal?.data,
            disabled: item._internal?.disabled,
          } as OptionType),
      ),
    ...dict
  }: SelectDictProps<ValueType, OptionType>) => {
  return (
    <MultipleDict
      {...dict}
      value={isArray(value) ? value : value ? [value] : []}
      render={({loading, onChange, dict, items, pick}) => {
        if (loading) {
          return <Icon.Loading/>;
        }

        const filter = dict._internal?.selectFilter;
        const showSearch = typeof props?.showSearch === 'boolean' ? props?.showSearch : !!filter;

        return (
          // @ts-ignore
          <Select<any>
            {...props}
            showSearch={showSearch}
            filterOption={
              !filter
                ? undefined
                : (inputValue, option) => {
                  const find = items.find((v) => v._internal?.data === option?.value);
                  return find ? filter(find, inputValue) : false;
                }
            }
            // 单选和多选都传入数组
            value={pick.map((p) => p._internal?.data)}
            onChange={onChange}
            options={optionsRender(items)}
          />
        );
      }}
    />
  );
};
export default SelectDict;
