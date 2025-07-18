import {PaginationParams, PaginationResult} from '@/types/global';
import {INFRA} from '@/types/infra';
import request from '.';
import {Options} from '..';

export const dictList = async (qo: INFRA.DictConfigQO, options: Options = {}) => {
  return request.get<INFRA.DictVO[]>('infra/dict/list', qo, options);
};

export const dictUpdate = async (po: INFRA.DictConfigUPO) => {
  return request.post('infra/dict/update', po);
};

export const configPage = async (qo: PaginationParams<INFRA.InfraConfigQO>) =>
  request.get<PaginationResult<INFRA.InfraConfig>>('infra/config', qo);

export const configUpsert = async (po: INFRA.InfraConfigUPO) => request.post('infra/config', po);
