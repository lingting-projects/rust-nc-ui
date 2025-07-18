import {Divider, Space} from 'antd';
import {SpaceProps} from 'antd/es/space';
import React, {useMemo} from 'react';

export type TableActionProps = {
  split?: boolean | React.ReactNode;
  unselect?: boolean;
} & Omit<SpaceProps, 'split'>;

const defaultSplit = <Divider type="vertical"/>;

const InternalTableAction: React.FC<TableActionProps> = ({
                                                           split,
                                                           unselect,
                                                           className,
                                                           children,
                                                           ...rest
                                                         }) => {
  const spaceSplit = useMemo(() => {
    if (split === false) {
      return undefined;
    }
    if (typeof split === 'undefined' || split === true) {
      return defaultSplit;
    }
    return split;
  }, [split]);

  const spaceClassName = useMemo(() => {
    const names: string[] = [];

    if (className && className.length > 0) {
      names.push(className);
    }

    if (unselect || typeof unselect === 'undefined') {
      names.push('unselect');
    }

    return names.join(' ');
  }, [unselect, className]);

  return (
    <Space {...rest} split={spaceSplit} className={spaceClassName}>
      {children}
    </Space>
  );
};

type TableActionComponent = typeof InternalTableAction & {
  //
};

const TableAction = InternalTableAction as TableActionComponent;

export default TableAction;
