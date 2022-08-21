import { Toast as IToast, useToast } from "@gino/toast";
import { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ToastExtraProps {
  date: Date;
}

export function ToastContainer() {
  const { toasts } = useToast<ToastExtraProps>();

  if (!toasts.length) return null;

  return (
    <div>
      <AnimatePresence>
        {toasts.map((toast, index, array) => (
          <div
            key={toast.id}
            className="absolute right-4 bottom-4 max-w-md w-full"
            style={
              {
                transform: `translateY(calc(var(--index) * -15px)) scale(calc(-1 * var(--index) * 0.05 + 1))`,
                "--index": array.length - index,
              } as CSSProperties
            }
          >
            <Toast toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ toast }: { toast: IToast<ToastExtraProps> }) {
  const { removeToast } = useToast<ToastExtraProps>();

  return (
    <motion.div
      layout
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 30 }}
      initial={{ opacity: 0, translateY: 30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="px-5 py-4 text-white bg-black rounded-lg relative group border border-white/10"
    >
      <div className="text-sm mb-0.5 font-medium">{toast.message}</div>
      <div className="text-xs text-white/50">
        {toast.props.date.toLocaleDateString("en-us", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      <div className="absolute transition duration-150 ease-in-out opacity-0 -top-2 -left-2 group-hover:opacity-100">
        <button
          onClick={() => removeToast(toast.id)}
          className="flex items-center justify-center w-5 h-5 text-xs bg-black border-white/[0.07] border text-white/50 hover:text-white/100 rounded-full transition duration-150 ease-in-out focus:outline-none"
          aria-label="Dismiss toast"
          title="Dismiss toast"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-2 h-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
