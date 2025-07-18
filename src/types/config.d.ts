declare namespace CONFIG {
  type Config = {
    id: string;
    name: string;
    subscribeId: string;
    directGeoCnIp: boolean;
    directRuleIds: string[];
    proxyRuleIds: string[];
    rejectRuleIds: string[];
    tun: boolean;
    fakeIp: boolean;
    ipv6: boolean;
    includeNoArea: boolean;
    includeArea: boolean;
    areas: string[];
    includeNameKeyword: boolean;
    nameKeywords: string[];
    interval: string;
    updateTime: string;
    createTime: string;
  };
}
