declare namespace KERNEL {
  type KernelState = {
    key: string;
    installing: boolean;
    installed: boolean;
    starting: boolean;
    running: boolean;
    stoping: boolean;
    configId: string;
    error: boolean;
    reboot: boolean;
    reason: string;
    ui: string
  };
}
