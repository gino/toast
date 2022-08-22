import { createContext, ReactElement, useContext, useMemo } from "react";
import { Toast, ToastOptions, ToastProviderOptions } from "./types";
import { useQueue } from "./utils";

interface ToastContext<T extends object = {}> {
  toasts: Toast<T>[];
  toast: (message: string, options: ToastOptions<T>) => Toast<T>;
  removeToast: (toastId: string) => void;
}

const ToastContext = createContext<ToastContext | null>(null);

export function useToast<T extends object = {}>(): ToastContext<T> {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "Unable to find ToastContext, make sure to wrap your app with our `ToastProvider`"
    );
  }

  return context as ToastContext<any>;
}

interface ToastProviderProps {
  children: ReactElement | ReactElement[];
  options?: ToastProviderOptions;
}

export function ToastProvider({ children, options }: ToastProviderProps) {
  const limit = options?.limit ?? 3;
  const removeFirstOnLimit =
    options?.removeFirstOnLimit === undefined
      ? false
      : options?.removeFirstOnLimit;

  const {
    state: toasts,
    update,
    add,
  } = useQueue<Toast>({
    limit,
  });

  const removeToast = (id: string) => {
    update((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  const memoizedValue = useMemo<ToastContext>(
    () => ({
      toasts,
      toast: (message, options) => {
        const id = Math.random().toString(36).substring(2);

        const toast: Toast = {
          id,
          message,
          props: options.props ?? {},
        };

        if (removeFirstOnLimit && toasts.length === limit) {
          removeToast(toasts[0].id);
        }

        add(toast);

        return toast;
      },
      removeToast,
    }),
    [toasts]
  );

  return (
    <ToastContext.Provider value={memoizedValue}>
      {children}
    </ToastContext.Provider>
  );
}
