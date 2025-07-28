declare namespace CONFIG {
  type Config = {
    id: string;
    name: string;
    subscribeId: string;
    geoCn: boolean;
    ruleDirectIds: string[];
    ruleProxyIds: string[];
    ruleRejectIds: string[];
    tun: boolean;
    fakeIp: boolean;
    ipv6: boolean;
    includeAreaNon: boolean;
    includeArea: string[];
    includeNameContains: boolean;
    excludeArea: string[];
    excludeNameContains: boolean;
    interval: string;
    refreshTime: string;
    updateTime: string;
    createTime: string;
  };
}
