declare namespace UPMS {
  type AuthorizationVO = {
    authorization: string;
    tenantId: string;
    userId: string;
    username: string;
    nickname: string;
    avatar: string;
    enabled: boolean;
    roles: string[];
    permissions: string[];
    attributes: Record<string, any>;
  };
}
