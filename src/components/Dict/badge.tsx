import {SingleDict, SingleDictProps} from '@/components/Dict/dict';
import Icon from '@/components/Icon';
import {Badge, BadgeProps} from 'antd';
import React from 'react';

export type BadgeDictProps = {
  props?: Omit<BadgeProps, 'status' | 'color' | 'text'>;
  renderOnUnpick?: () => React.ReactNode;
} & Omit<SingleDictProps, 'onChange' | 'render'>;

const BadgeDict = ({props, renderOnUnpick, ...dict}: BadgeDictProps) => {
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

        const status = pick.attributes?.badgeStatus || 'default';
        const color = pick.attributes?.badgeColor;
        return <Badge {...props} status={status} color={color} text={pick._internal?.label}/>;
      }}
    />
  );
};
export default BadgeDict;
