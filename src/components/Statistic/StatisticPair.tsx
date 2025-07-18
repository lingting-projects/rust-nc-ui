import Column, {ColumnProps} from '@/components/Column';
import {Typography} from 'antd';
import {TextProps} from 'antd/es/typography/Text';
import React from 'react';

export type StatisticPairItemProps = TextProps;

export type StatisticPairProps = {
  label: React.ReactNode;
  labelProps?: Omit<StatisticPairItemProps, 'type'>;
  value: React.ReactNode;
  valueProps?: StatisticPairItemProps;
  props?: ColumnProps;
};

export default ({label, labelProps, value, valueProps, props}: StatisticPairProps) => (
  <Column {...props}>
    <Typography.Text ellipsis={true} {...labelProps} type={'secondary'}>
      {label}
    </Typography.Text>
    <Typography.Text ellipsis={true} {...valueProps}>
      {value}
    </Typography.Text>
  </Column>
);
