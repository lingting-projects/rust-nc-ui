declare namespace RULE {
  type Rule = {
    id: string;
    name: string;
    url: string;
    interval: string;
    count: number;
    processCount: number;
    domainCount: number;
    ipCount: number;
    otherCount: number;
    updateTime: string;
    createTime: string;
  };
}
