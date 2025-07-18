import request from '.';

export async function create(po: USER.UserCPO) {
  return request.post<USER.UserVO>('user/create', po);
}

export async function authorizationList() {
  return request.get<UPMS.AuthorizationVO[]>('user/authorization/list');
}

export async function authorizationCreate(po: USER.UserAuthorizationCPO) {
  return request.post<string>('user/authorization/create', po);
}

export async function authorizationClean(po: USER.UserAuthorizationCleanPO) {
  return request.post('user/authorization/clean', po);
}
