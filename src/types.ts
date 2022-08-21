export interface Toast<T extends object = {}> {
  id: string;
  message: string;
  props: T;
}

export interface ToastOptions<T extends object = {}> {
  /**
   * Amount of seconds a toast should stay visible before disappearing.
   * If `null` provided, toast will stay permanently.
   *
   * @default 1
   */
  duration?: number | null;

  props?: T;
}

export interface ToastProviderOptions {
  /**
   * Amount of toasts that will be shown until they get added to the queue.
   *
   * @default 3
   */
  limit?: number;
}
