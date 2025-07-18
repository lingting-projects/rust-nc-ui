import request from '.';

export const list = async () => {
  return request.get<SUBSCRIBE.Subscribe[]>('subscribe/list');
};

export const upsert = async (t: SUBSCRIBE.Subscribe) => {
  return request.post<string>('subscribe/upsert', t);
};

export const refresh = async (id?: string) => {
  return request.patch('subscribe/refresh', id ? {id} : {});
};

export const remove = async (id?: string) => {
  return request.post('subscribe/delete', id ? {id} : {});
};
