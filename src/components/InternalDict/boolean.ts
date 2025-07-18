import {INFRA} from '@/types/infra';

const enableDict = {
  id: '',
  code: 'EnableDict',
  name: '启用禁用字典',
  valueType: 'BOOLEAN',
  items: [
    {
      id: '',
      key: 'true',
      value: 'true',
      sort: 0,
      status: 'ENABLE',
      i18n: {
        'zh-CN': '启用',
        'en-US': 'Enabled',
      },
      attributes: {},
    },
    {
      id: '',
      key: 'false',
      value: 'false',
      sort: 1,
      status: 'ENABLE',
      i18n: {
        'zh-CN': '禁用',
        'en-US': 'Disabled',
      },
      attributes: {},
    },
  ] as INFRA.DictVO['items'],
} as const;

const whetherDict = {
  id: '',
  code: 'WhetherDict',
  name: '是否字典',
  valueType: 'BOOLEAN',
  items: [
    {
      id: '',
      key: 'true',
      value: 'true',
      sort: 0,
      status: 'ENABLE',
      i18n: {
        'zh-CN': '是',
        'en-US': 'True',
      },
      attributes: {},
    },
    {
      id: '',
      key: 'false',
      value: 'false',
      sort: 1,
      status: 'ENABLE',
      i18n: {
        'zh-CN': '否',
        'en-US': 'False',
      },
      attributes: {},
    },
  ] as INFRA.DictVO['items'],
} as const;

const whetherIncludeDict = {
  id: '',
  code: 'WhetherIncludeDict',
  name: '是否包含字典',
  valueType: 'BOOLEAN',
  items: [
    {
      id: '',
      key: 'true',
      value: 'true',
      sort: 0,
      status: 'ENABLE',
      i18n: {
        'zh-CN': '包含',
        'en-US': 'Include',
      },
      attributes: {},
    },
    {
      id: '',
      key: 'false',
      value: 'false',
      sort: 1,
      status: 'ENABLE',
      i18n: {
        'zh-CN': '排除',
        'en-US': 'Exclude',
      },
      attributes: {},
    },
  ] as INFRA.DictVO['items'],
} as const;

const whetherExcludeDict = {
  id: '',
  code: 'WhetherExcludeDict',
  name: '是否排除字典',
  valueType: 'BOOLEAN',
  items: [
    {
      id: '',
      key: 'true',
      value: 'true',
      sort: 0,
      status: 'ENABLE',
      i18n: {
        'zh-CN': '排除',
        'en-US': 'Exclude',
      },
      attributes: {},
    },
    {
      id: '',
      key: 'false',
      value: 'false',
      sort: 1,
      status: 'ENABLE',
      i18n: {
        'zh-CN': '包含',
        'en-US': 'Include',
      },
      attributes: {},
    },
  ] as INFRA.DictVO['items'],
} as const;

export default [enableDict, whetherDict, whetherIncludeDict, whetherExcludeDict];
