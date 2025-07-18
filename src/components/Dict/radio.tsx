import Icon from '@/components/Icon';
import {INFRA} from '@/types/infra';
import {Radio, RadioGroupProps} from 'antd';
import {SingleDict, SingleDictProps} from './dict';

export type RadioDictProps = {
  props?: Omit<RadioGroupProps, 'value' | 'onChange' | 'options'>;
  optionsRender?: (items: INFRA.DictItemVO[]) => RadioGroupProps['options'];
} & Omit<SingleDictProps, 'render'>;

const defaultOptionsRender: RadioDictProps['optionsRender'] = (items) => {
  return items.map((item) => {
    return {
      label: item._internal?.label,
      value: item._internal?.data,
      disabled: item._internal?.disabled,
    };
  });
};

const RadioDict = ({props, optionsRender = defaultOptionsRender, ...dict}: RadioDictProps) => {
  return (
    <SingleDict
      {...dict}
      render={({loading, onChange, items, pick}) => {
        if (loading) {
          return <Icon.Loading/>;
        }

        return (
          <Radio.Group
            {...props}
            value={pick?._internal?.data}
            onChange={(e) => onChange(e.target.value)}
            options={optionsRender(items)}
          />
        );
      }}
    />
  );
};
export default RadioDict;
