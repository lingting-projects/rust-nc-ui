import {INFRA} from '@/types/infra';
import areaSource from './area';
import booleanSource from './boolean';

const area = [...areaSource, ...booleanSource];

export type InnerDictCodes =
  | string
  | (typeof areaSource)[number]['code']
  | (typeof booleanSource)[number]['code'];

const record: Record<InnerDictCodes, INFRA.DictVO> = {};

area.forEach((v) => {
  // @ts-ignore
  record[v.code] = v;
});

export default record;
