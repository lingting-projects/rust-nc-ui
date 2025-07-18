import {Password} from '@/holder/Password';
import {AxiosResponseTransformer} from 'axios';
import request from '.';

const transformResponse: AxiosResponseTransformer = (data) => {
  const json = data ? JSON.parse(data) : {};
  if (json.code) {
    return json;
  }
  return {
    code: 200,
    data: data ? json : null,
    message: 'Success',
  };
};

export async function resolver() {
  return Promise.resolve<UPMS.AuthorizationVO>({
    attributes: {},
    authorization: '',
    avatar: '',
    enabled: true,
    nickname: '',
    permissions: [],
    roles: [],
    tenantId: '',
    userId: '',
    username: '',
  });
}

export async function logout() {
  return request.request('delete', '/authorization/logout', null, null, {
    transformResponse,
  });
}

export async function loginPassword(username: string, password: string) {
  const encrypt = Password.encrypt(password);
  return request.get<UPMS.AuthorizationVO>(
    '/authorization/password',
    {
      username,
      password: encrypt,
    },
    {transformResponse},
  );
}
