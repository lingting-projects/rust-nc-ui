import request from '.';

export const list = async () => {
  return request.get<RULE.Rule[]>('rule/list');
};

export const upsert = async (t: RULE.Rule) => {
  return request.post<string>('rule/upsert', t);
};

export const refresh = async (id?: string) => {
  return request.patch('rule/refresh', id ? {id} : {});
};

export const remove = async (id?: string) => {
  return request.post('rule/delete', id ? {id} : {});
};
