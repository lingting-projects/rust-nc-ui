import Dict, {DictKeys} from '@/components/Dict';
import {I18n, I18nKeys} from '@/holder/I18n';
import {PaginationParams, PaginationResult, PaginationSort} from '@/types/global';
import {Outlet} from '@@/exports';
import {ParamsType} from '@ant-design/pro-provider';
import {ProColumnType, ProTable, ProTableProps} from '@ant-design/pro-table';
import type {AlertRenderType} from '@ant-design/pro-table/es/components/Alert';
import type {OptionConfig} from '@ant-design/pro-table/es/components/ToolBar';
import {undefined} from '@umijs/utils/compiled/zod';
import {TablePaginationConfig} from 'antd';
import React, {useMemo} from 'react';

/**
 * @param D 请求返回数据类型
 * @param Q 请求参数(除分页参数外)
 * @param V 值类型
 * @param QO 方便内部复用的QO, 指定Q即可
 */
export type TableProps<VO, Q = VO, V = 'text', QO = PaginationParams<Partial<Q>>> = {
  params?: Partial<QO>;
  request?: (params: QO) => Promise<PaginationResult<VO> | VO[]>;
  columns?: TableColumnType<VO, V>[];
  // 设置为true 渲染默认内容.
  tableAlertRender?: AlertRenderType<VO> | true;
  beforeSearchSubmit?: (
    params: Partial<QO> & Record<string, any>,
  ) => Partial<QO> & Record<string, any>;
  scroll?: ProTableProps<VO, QO, V>['scroll'] | false;
  hidden?: boolean;
  style?: ProTableProps<VO, QO, V>['style'];
} & Omit<
  ProTableProps<VO, QO, V>,
  'request' | 'columns' | 'tableAlertRender' | 'beforeSearchSubmit' | 'scroll' | 'params'
>;

type ProColumnTypeRenderText<VO = any, V = 'text'> = Exclude<
  ProColumnType<VO, V>['renderText'],
  undefined
>;
type ProColumnTypeRender<VO = any, V = 'text'> = Exclude<ProColumnType<VO, V>['render'], undefined>;

type ProColumnTypeRenderFormItem<VO = any, V = 'text'> = Exclude<
  ProColumnType<VO, V>['renderFormItem'],
  undefined
>;

export type TableColumnDictType<VO = any, V = 'text'> = {
  code: string;
  renderText?: (params: {
    code: string;
    text: Parameters<ProColumnTypeRenderText<VO, V>>[0];
    record: Parameters<ProColumnTypeRenderText<VO, V>>[1];
    index: Parameters<ProColumnTypeRenderText<VO, V>>[2];
    action: Parameters<ProColumnTypeRenderText<VO, V>>[3];
  }) => ReturnType<ProColumnTypeRenderText<VO, V>>;
  render?: (params: {
    code: string;
    dom: Parameters<ProColumnTypeRender<VO, V>>[0];
    entity: Parameters<ProColumnTypeRender<VO, V>>[1];
    index: Parameters<ProColumnTypeRender<VO, V>>[2];
    action: Parameters<ProColumnTypeRender<VO, V>>[3];
    schema: Parameters<ProColumnTypeRender<VO, V>>[4];
  }) => ReturnType<ProColumnTypeRender<VO, V>>;
  renderFormItem?: (params: {
    code: string;
    schema: Parameters<ProColumnTypeRenderFormItem<VO, V>>[0];
    config: Parameters<ProColumnTypeRenderFormItem<VO, V>>[1];
    form: Parameters<ProColumnTypeRenderFormItem<VO, V>>[2];
    action: Parameters<ProColumnTypeRenderFormItem<VO, V>>[3];
  }) => ReturnType<ProColumnTypeRenderFormItem<VO, V>>;
};

export type TableColumnType<VO = any, V = 'text', K = keyof VO> = {
  title: ProColumnType<VO, V>['title'] | string | I18nKeys;
  dataIndex: React.Key | React.Key[] | K | K[];
  dict?: string | DictKeys | TableColumnDictType<VO, V>;
} & Omit<ProColumnType<VO, V>, 'dataIndex' | 'title'>;

const defaultOptions: OptionConfig = {
  setting: true,
  reload: true,
  fullScreen: true,
  density: true,
};

const defaultPagination: TablePaginationConfig = {
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 30, 50, 100],
  defaultPageSize: 10,
  hideOnSinglePage: false,
};

const defaultDict: Partial<TableColumnDictType> = {
  renderText: ({code, text}) => {
    if (
      typeof text === 'undefined' ||
      text === null ||
      (typeof text === 'string' && text.length < 1)
    ) {
      return '-';
    }

    return <Dict.Tag code={code} value={text}/>;
  },
  renderFormItem: ({code}) => (
    <Dict.Select code={code} props={{allowClear: true, maxTagCount: 1}}/>
  ),
};

const defaultScroll = {x: 'max-content'};

const Table = <
  VO extends Record<string, any> = any,
  Q = VO,
  V = 'text',
  QO extends Partial<ParamsType & PaginationParams<Q>> = PaginationParams<Partial<Q>>,
>({
    request,
    options,
    columns,
    tableAlertRender,
    pagination,
    scroll,
    hidden,
    style,
    params,
    ...props
  }: TableProps<VO, Q, V, QO>) => {
  // @ts-ignore
  const proRequest: ProTableProps<VO, QO, V>['request'] = useMemo(() => {
    if (!request) {
      return undefined;
    }
    return async ({current, pageSize, ...qo}, sort) => {
      const params = {
        ...qo,
        page: current,
        size: pageSize,
      } as QO;

      if (sort) {
        const sorts: PaginationSort<Q>[] = [];

        Object.keys(sort).forEach((k) => {
          const v = sort[k];
          const desc = v !== 'ascend';
          sorts.push(`${k},${desc ? 'desc' : 'asc'}`);
        });

        params.sorts = sorts;
      }

      const result = await request(params);
      if ('total' in result) {
        const {total, records} = result;
        return {success: true, total, data: records};
      }
      return {success: true, total: result.length, data: result};
    };
  }, [request]);
  const proOptions = useMemo((): ProTableProps<VO, QO, V>['options'] => {
    if (options === false) {
      return false;
    }
    return {...defaultOptions, ...options};
  }, [options]);
  const proColumns = useMemo(() => {
    return columns?.map((column) => {
      const v = {...column};
      if (v.title && typeof v.title === 'string') {
        v.title = I18n.text(v.title);
      }

      if (v.defaultSortOrder && typeof v.sorter === 'undefined') {
        v.sorter = true;
      }
      if (v.dict) {
        const d: TableColumnDictType<VO, V> =
          typeof v.dict === 'string' ? {code: v.dict} : v.dict;
        const merge = {...defaultDict, ...d};
        if (merge.renderText) {
          v.renderText = (text, record, index, action) =>
            merge.renderText &&
            merge.renderText({
              code: d.code,
              text,
              record,
              index,
              action,
            });
        }
        if (merge.render) {
          v.render = (dom, entity, index, action, schema) =>
            merge.render &&
            merge.render({
              code: d.code,
              dom,
              entity,
              index,
              action,
              // @ts-ignore
              schema,
            });
        }
        if (merge.renderFormItem) {
          v.renderFormItem = (schema, config, form, actions) =>
            merge.renderFormItem &&
            merge.renderFormItem({
              code: d.code,
              // @ts-ignore
              schema,
              // @ts-ignore
              config,
              form,
              actions,
            });
        }
      }
      return v;
    }) as ProTableProps<VO, QO, V>['columns'];
  }, [columns]);
  const proTableAlertRender: ProTableProps<VO, QO, V>['tableAlertRender'] = useMemo(() => {
    if (tableAlertRender === false || typeof tableAlertRender === 'undefined') {
      return false;
    }
    if (typeof tableAlertRender === 'boolean') {
      return;
    }
    return tableAlertRender;
  }, [tableAlertRender]);
  const proPagination = useMemo(() => {
    if (pagination === false) {
      return false;
    }
    return {...defaultPagination, ...pagination};
  }, [pagination]);
  const proScroll = useMemo(() => {
    if (scroll === false) {
      return;
    }
    return {...defaultScroll, ...scroll};
  }, [scroll]);
  const proStyle = useMemo(() => {
    const raw: React.CSSProperties = {};
    if (hidden) {
      raw.display = 'none';
    }
    return {...style, ...raw};
  }, [style, hidden]);

  return (
    <ProTable<VO, QO, V>
      rowKey={'id'}
      {...props}
      request={proRequest}
      options={proOptions}
      columns={proColumns}
      tableAlertRender={proTableAlertRender}
      pagination={proPagination}
      scroll={proScroll}
      tableClassName={'layout-scroll-table'}
      style={proStyle}
      // @ts-ignore
      params={params}
    >
      <Outlet/>
    </ProTable>
  );
};
export default Table;
