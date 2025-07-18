import {INFRA} from '@/types/infra';
import request from '.';
import {Options} from '..';

export const list = async (qo: INFRA.DictConfigQO, options: Options = {}) => {
  return request.get<INFRA.DictVO[]>('infra/dict/list', qo, options);
};

export const update = async (po: INFRA.DictConfigUPO) => {
  return request.post('infra/dict/update', po);
};
