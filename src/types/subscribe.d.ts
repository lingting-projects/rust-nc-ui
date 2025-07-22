declare namespace SUBSCRIBE {
  type Subscribe = {
    id: string;
    name: string;
    url: string;
    interval: string;
    updateTime: number;
    createTime: number;
    refreshTime: number;
    download: number;
    upload: number;
    max: number;
    expireTime: number;
  };
}
