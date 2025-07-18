import React from 'react';

declare namespace INFRA {
  type DictValueType = 'NUMBER' | 'STRING' | 'BOOLEAN';

  type DictStatus = 'ENABLE' | 'DISABLE';

  type InternalDict = {
    // select 本地搜索
    selectFilter?: (item: DictItemVO, input?: string) => boolean;
  };

  type DictVO = {
    id: string;
    name: string;
    code: string;
    valueType: DictValueType;
    items: DictItemVO[];
    _internal?: InternalDict;
  };

  type InternalItem = {
    // 自定义label
    label?: string | any | React.ReactNode;
    // 自定义label渲染
    renderLabel?: (
      label: InternalItem['label'],
      props?: Record<string, any> | any,
    ) => React.ReactNode;
    // 转换出来的真实值
    data?: any;
    // 计算的是否禁用
    disabled?: boolean;
    // 挂载的原始数据
    source?: any;
  };

  type DictItemVO = {
    id: string;
    key: string;
    value: string;
    sort: number;
    status: DictStatus;
    i18n: Record<string, string>;
    attributes: Record<string, any>;
    _internal?: InternalItem;
  };

  type DictConfigQO = Partial<{
    code: string;
    codes: string[];
    valueType: DictValueType;
    valueTypes: DictValueType[];
    key: string;
    keys: string[];
    status: DictStatus;
    statuses: DictStatus[];
    createTimeStart: string;
    createTimeEnd: string;
  }>;

  type DictConfigUPO = {
    id: string;
    valueType?: DictValueType;
    status?: DictStatus;
    sort?: number;
    i18n?: Record<string, string>;
    attributes?: Record<string, any>;
  };

  type InfraConfig = {
    id: string;
    key: string;
    value: string;
    remark: string;
    updateTime: string;
  };

  type InfraConfigQO = Partial<{
    key: string;
  }>;

  type InfraConfigUPO = {
    key: string;
    value: string;
    remark: string;
  };
}
