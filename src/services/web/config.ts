import request from '.';

export const list = async () => {
  return request.get<CONFIG.Config[]>('config/list');
};

export const upsert = async (t: CONFIG.Config) => {
  return request.post<string>('config/upsert', t);
};

export const refresh = async (id?: string) => {
  return request.patch('config/refresh', id ? { id } : {});
};

export const remove = async (id?: string) => {
  return request.post('config/delete', id ? { id } : {});
};

export const initialValue = async () => request.get<Partial<CONFIG.Config>>('config/default');
