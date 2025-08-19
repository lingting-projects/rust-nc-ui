declare namespace RULE {
  type Rule = {
    id: string;
    name: string;
    content: string;
    url: string;
    interval: number;
    updateTime: string;
    createTime: string;
    refreshTime: string;
    count: number;
    countProcess: number;
    countIp: number;
    countOther: number;
  };
}
