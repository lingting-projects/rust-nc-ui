import DateTimeUtils, { DataTimeValue } from '@/util/DateTimeUtils';
import { Input, InputProps, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';

// key: 来源类型. value: 目标类型
const types = DateTimeUtils.durationConverts;

export type TimeDurationSourceType = keyof typeof types;

export type TimeDurationValueType = TimeDurationSourceType;

export type TimeDurationProps = {
  // 值类型
  valueType?: TimeDurationValueType;
  // 默认来源类型
  defaultSourceType?: TimeDurationSourceType;
  value?: DataTimeValue;
  onChange?: (v: DataTimeValue) => void;
} & Omit<InputProps, 'type' | 'value' | 'onChange' | 'onchange'>;

const convert = (
  type: TimeDurationValueType,
  source: DataTimeValue,
  sourceType: TimeDurationSourceType,
): DataTimeValue => {
  return types[sourceType][type](source);
};

export default ({
  valueType = 'millis',
  defaultSourceType = 'hours',
  value,
  onChange,
  ...prop
}: TimeDurationProps) => {
  const [v, setV] = useState<DataTimeValue>();
  const [sourceType, setSourceType] = useState<TimeDurationSourceType>(defaultSourceType);

  const change = useCallback(
    (source: DataTimeValue) => {
      const _v = convert(valueType, source, sourceType);
      if (onChange) {
        onChange(_v);
      } else {
        setV(_v);
      }
    },
    [valueType, sourceType, onChange],
  );

  useEffect(() => {
    if (value === undefined || value === null) {
      setV(undefined);
    } else {
      const _v = types[valueType][sourceType](value);
      setV(_v);
    }
  }, [value, sourceType]);

  return (
    <>
      <Input
        onBlur={() => {}}
        {...prop}
        value={v}
        onChange={(e) => {
          change(e.target.value);
        }}
        addonAfter={
          <>
            <Select
              value={sourceType}
              onChange={(v) => setSourceType(v)}
              options={Object.keys(types).map((k) => ({ label: k, value: k }))}
              style={{ minWidth: '100px' }}
            />
          </>
        }
      />
    </>
  );
};
