import {SingleDict, SingleDictProps} from '@/components/Dict/dict';
import Icon from '@/components/Icon';
import {Tag, TagProps} from 'antd';
import React from 'react';

export type TagDictProps = {
  props?: Omit<TagProps, 'color'>;
  renderOnUnpick?: () => React.ReactNode;
} & Omit<SingleDictProps, 'onChange' | 'render'>;

const TagDict = ({props, renderOnUnpick, ...dict}: TagDictProps) => {
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

        const color = pick.attributes?.tagColor;
        return (
          <Tag {...props} color={color}>
            {pick._internal?.label}
          </Tag>
        );
      }}
    />
  );
};
export default TagDict;
