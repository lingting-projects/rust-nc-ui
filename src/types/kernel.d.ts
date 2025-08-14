declare namespace KERNEL {
  type KernelState = {
    running: boolean;
    error: boolean;
    reason: string;
    configId: string;
    ui: string;
  };
}
