// 与后端约定的响应数据格式
export interface R<T = any> {
  code: number;
  message: string;
  data: T;
}

export type PaginationSortOrder = 'desc' | 'asc';

export type PaginationSort<Q = any> =
  | {
  field: string | keyof Q;
  desc: boolean;
}
  | `${string | keyof Q},${PaginationSortOrder}`;

export type PaginationParams<Q = any> = {
  page: number;
  size: number;
  sorts?: PaginationSort<Q>[];
} & Partial<Q>;

export type PaginationResult<V = any> = {
  total: number;
  records: V[];
};

export type BatchIdsPO = {
  ids: string[];
};

export type IdPo = {
  id: string;
};

/**
 * 申明从 [start,end]内容, 全包
 */
export type Part = {
  index: number;
  start: number;
  end: number;
};

export const PERMISSIONS = ['m:user:table', 'p:user:query', 'm:system:dict'] as const;

export type Permission = (typeof PERMISSIONS)[number] | string;

export type Permissions = Permission | Permission[];
