declare namespace USER {
  export type UserVO = {
    tenantId: string;
    tenantUsername: string;
    tenantNickname: string;
    userId: string;
    account: string;
    username: string;
    nickname: string;
    avatar: string;
    email: string;
    mobile: string;
    status: string;
    main: boolean;
    createTime: string;
  };

  export type UserQO = Partial<{
    tenantId: string;
    tenantIds: string[];
    userId: string;
    userIds: string[];
    account: string;
    accounts: string[];
    username: string;
    usernames: string[];
    nickname: string;
    nicknames: string[];
    email: string;
    emails: string[];
    mobile: string;
    mobiles: string[];
    status: string;
    statuses: string[];
    main: boolean;
    createTimeStart: string;
    createTimeEnd: string;
  }>;

  type UserCPO = {
    username: string;
    nickname: string;
    password: string;
    email: string;
    mobile: string;
    avatar: string;
  };

  type UserAuthorizationCPO = {
    tenantId: string;
    userId: string;
    expireTime: string;
    remark: string;
  };

  type UserAuthorizationCleanPO = Partial<{
    userId: string;
    authorizations: string[];
  }>;
}
