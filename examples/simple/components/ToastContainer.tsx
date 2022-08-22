import { Toast as IToast, useToast, useToastTimer } from "@gino/toast";

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <ul className="absolute bottom-8 right-8 flex flex-col gap-4 max-w-md w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </ul>
  );
}

function Toast({ toast }: { toast: IToast }) {
  const { removeToast } = useToast();

  const ref = useToastTimer<HTMLLIElement>(toast.id, {
    duration: 3, // In seconds,
    pauseOnHover: true,
  });

  return (
    <li
      ref={ref}
      className="bg-blue-600 text-white px-4 py-3 rounded-md flex items-center"
    >
      <span className="flex-1">
        {toast.message} ({toast.id})
      </span>

      <button
        className="bg-black/10 px-4 py-2 text-sm font-semibold rounded"
        onClick={() => removeToast(toast.id)}
      >
        Dismiss
      </button>
    </li>
  );
}
