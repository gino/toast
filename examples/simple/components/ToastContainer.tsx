import { Toast as IToast, useToast } from "@gino/toast";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useState } from "react";

export interface ToastExtraProps {
  date: Date;
}

export function ToastContainer() {
  const { toasts } = useToast<ToastExtraProps>();

  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="fixed bottom-4 right-4"
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatePresence>
        {toasts.map((toast, index, array) => (
          <div
            key={toast.id}
            className="absolute bottom-0 right-0 w-[400px] transition-transform duration-500 ease-in-out before:absolute before:inset-x-[var(--gap)] before:top-[var(--gap)] before:bottom-0"
            style={
              {
                "--index": array.length - index,
                "--gap": "-14px",
                transform: hovering
                  ? "translateY(calc((var(--index) - 1) * -85px))"
                  : "translateY(calc((var(--index) - 1) * -15px)) scale(calc(-1 * (var(--index) - 1) * 0.05 + 1))",
              } as CSSProperties
            }
            onMouseEnter={() => setHovering(true)}
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
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      exit={{ opacity: 0, scale: 0.8, translateY: 20 }}
      initial={{ opacity: 0, scale: 1, translateY: 20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative px-5 py-4 text-white bg-black border rounded-lg shadow shadow-black/30 border-white/10 group select-none"
      drag="x"
      dragConstraints={{ left: 0, right: 40 }}
      dragSnapToOrigin={true}
      onDragEnd={(event, info) => {
        const offset = info.offset.x;

        if (offset >= 130) {
          removeToast(toast.id);
        }
      }}
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
          onClick={() => {
            removeToast(toast.id);
          }}
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
