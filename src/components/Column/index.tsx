import {Property} from 'csstype';
import React, {ReactNode} from 'react';

export type ColumnProps = {
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
  children?: ReactNode | undefined;
  reverse?: boolean;
  style?: React.CSSProperties;
};

const Column: React.FC<ColumnProps> = ({justify, align, reverse, style, children}) => {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: reverse ? 'column-reverse' : 'column',
        justifyContent: justify || 'center',
        alignItems: align || 'center',
      }}
    >
      {children}
    </div>
  );
};

export default Column;
