import Icon from '@/components/Icon';
import {INFRA} from '@/types/infra';
import {Checkbox} from 'antd';
import {CheckboxGroupProps} from 'antd/es/checkbox/Group';
import {MultipleDict, MultipleDictProps} from './dict';

export type CheckboxDictProps<T = any> = {
  props?: Omit<CheckboxGroupProps<T>, 'value' | 'onChange' | 'options'>;
  optionsRender?: (items: INFRA.DictItemVO[]) => CheckboxGroupProps<T>['options'];
} & Omit<MultipleDictProps, 'render'>;

const CheckBoxDict = <T = any, >({
                                   props,
                                   optionsRender = (items) =>
                                     items.map((item) => ({
                                       label: item._internal?.label,
                                       value: item._internal?.data,
                                       disabled: item._internal?.disabled,
                                     })),

                                   ...dict
                                 }: CheckboxDictProps<T>) => {
  return (
    <MultipleDict
      {...dict}
      render={({loading, onChange, items, pick}) => {
        if (loading) {
          return <Icon.Loading/>;
        }

        return (
          <Checkbox.Group
            {...props}
            value={pick.map((p) => p._internal?.data)}
            onChange={onChange}
            options={optionsRender(items)}
          />
        );
      }}
    />
  );
};
export default CheckBoxDict;
