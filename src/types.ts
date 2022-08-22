export interface Toast<T extends object = {}> {
  id: string;
  message: string;
  props: T;
}

export interface ToastOptions<T extends object = {}> {
  props?: T;
}

export interface ToastProviderOptions {
  /**
   * Amount of toasts that will be shown until they get added to the queue.
   *
   * @default 3
   */
  limit?: number;
  /**
   * If the limit has been reached, the first toast will be removed whenever a new one gets added.
   *
   * @default false
   */
  removeFirstOnLimit?: boolean;
}

export interface ToastTimerOptions {
  /**
   * Amount of seconds a toast should stay visible before disappearing.
   *
   * @default 3
   */
  duration?: number;
  /**
   * Pauses the toast timer whenever the user is hovering your toast.
   *
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Makes the toast sticky, meaning that the toast will not disappear after a certain amount of seconds.
   *
   * @default false
   */
  sticky?: boolean;
}
