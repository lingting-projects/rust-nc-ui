declare namespace SETTINGS {
  type Kernel = {
    singBoxVersion: string;
    ui: string;
    mixedListen: string;
    mixedPort: u16;
    dnsCn: Vec<string>;
    dnsProxy: Vec<string>;
  };
  type Software = {
    startup: boolean;
    minimize: boolean;
    version: string;
    fastGithub: string;
    testUrl: string;
  };
  type Run = {
    auto: boolean;
    selected: Option<string>;
  };
  type Settings = {
    kernel: Kernel;
    software: Software;
    run: Run;
  };
  type AppUpdater = {
    checking: boolean;
    new: boolean;
    downloading: boolean;
    unzipping: boolean;
    installing: boolean;
    installed: boolean;
    error: boolean;
    reason: string;
  };
}
