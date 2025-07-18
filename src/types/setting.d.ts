declare namespace SETTINGS {
  type Settings = {
    id: string;
    githubFast: string;
    singUi: string;
    singMixListen: string;
    singMixPort: number;
    testUrl: string;
    geoCnIpUrl: string;
    cnDnsArray: string[];
    proxyDnsArray: string[];
    runOnStarted: boolean;
    updateTime: string;
    createTime: string;
  };
  type SettingsVO = Settings & {
    singVersion: string;
    startup: boolean;
    minimize: boolean;
    version: string;
    activeProfiles: string[];
  };
  type AppUpdater = {
    checking: boolean;
    hasNew: boolean;
    downloading: boolean;
    unzipping: boolean;
    installing: boolean;
    installed: boolean;
    error: boolean;
    reason: string;
  };
}
