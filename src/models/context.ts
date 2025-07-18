import {Context} from '@/holder/Context';
import {Store} from '@/holder/Store';
import {upmsLogin} from '@/services/upms';
import DocumentUtils, {xw} from '@/util/DocumentUtils';
import {useCallback, useState} from 'react';
import configs from '../../config/settings';

export const AUTH_PARAMS = 'authorization';
export const AUTH_HEADER = 'authorization';

const findAuthorization = () => {
  const params = DocumentUtils.urlParams();
  let authorization = params.get(AUTH_PARAMS) || undefined;

  if (!authorization || authorization.length < 1) {
    authorization = Store.authorization.get();
  } else {
    xw.queryToken = true;
  }

  if (authorization) {
    Store.authorization.set(authorization, !xw.queryToken);
  }

  return authorization;
};

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UPMS.AuthorizationVO>();
  const [settings, setSettings] = useState<Partial<typeof configs>>(configs);

  const refresh = useCallback(async () => {
    setLoading(true);

    let authorization = findAuthorization();
    let isValid = !!authorization && authorization.length > 0;

    // 不是登录页面, 存在token，解析
    if (!Context.isLoginPath() && isValid) {
      try {
        const vo = await upmsLogin.resolver();
        // 解析结果正常
        if (vo) {
          setUser(vo);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('token resolver error!', error);
      }
    }

    Context.logout(isValid);
  }, []);

  return {loading, user, settings, refresh, setLoading, setUser, setSettings};
};
