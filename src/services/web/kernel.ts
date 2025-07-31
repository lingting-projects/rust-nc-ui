import request from '.';

export const state = async () => {
  return request.get<KERNEL.KernelState>('kernel/state');
};

export const start = async (id: string) => {
  return request.post('kernel/start', { id });
};

export const stop = async (id: string) => {
  return request.post('kernel/stop', {id});
};
