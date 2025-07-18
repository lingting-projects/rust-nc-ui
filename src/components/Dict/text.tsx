import {SingleDict, SingleDictProps} from '@/components/Dict/dict';
import Icon from '@/components/Icon';
import {Typography} from 'antd';
import {TextProps} from 'antd/es/typography/Text';
import React from 'react';

export type TextDictProps = {
  props?: TextProps;
  renderOnUnpick?: () => React.ReactNode;
} & Omit<SingleDictProps, 'onChange' | 'render'>;

const TextDict = ({props, renderOnUnpick, ...dict}: TextDictProps) => {
  return (
    <SingleDict
      {...dict}
      render={({loading, pick}) => {
        if (loading) {
          return <Icon.Loading/>;
        }

        if (!pick) {
          return renderOnUnpick ? renderOnUnpick() : <Icon.Error/>;
        }

        return <Typography.Text {...props}>{pick._internal?.label}</Typography.Text>;
      }}
    />
  );
};
export default TextDict;
