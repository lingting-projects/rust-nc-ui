import {PaginationParams, PaginationResult} from '@/types/global';
import request from '.';

export const page = async (qo: PaginationParams<USER.UserQO>) => {
  return request.get<PaginationResult<USER.UserVO>>('user/page', qo);
};
