import { useToast } from "@gino/toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <ul className="absolute bottom-8 right-8 flex flex-col gap-4 max-w-md w-full">
      {toasts.map((toast) => (
        <li
          key={toast.id}
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
      ))}
    </ul>
  );
}
