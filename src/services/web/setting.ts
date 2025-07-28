import request from '.';

export const get = async () => {
  return request.get<SETTINGS.Settings>('settings/get');
};

export const upsert = async (t: SETTINGS.Settings) => {
  return request.post<string>('settings/upsert', t);
};

export const updaterCheck = async () => request.post<boolean>('settings/update/check');

export const updaterInstall = async () => request.post<boolean>('settings/update/install');

export const updaterState = async () => request.get<SETTINGS.AppUpdater>('settings/update/state');
