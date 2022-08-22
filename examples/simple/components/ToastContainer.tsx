import { Toast as IToast, useToast, useToastTimer } from "@gino/toast";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useEffect, useState } from "react";

export interface ToastExtraProps {
  date: Date;
  sticky: boolean;
}

export function ToastContainer() {
  const { toasts } = useToast<ToastExtraProps>();

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // If all toasts are removed while in hovering state, the hover should be manually disabled
    if (hovering && !toasts.length) {
      setHovering(false);
    }
  }, [toasts]);

  return (
    <div
      className="fixed bottom-4 right-4"
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatePresence>
        {toasts.map((toast, index, array) => {
          const reversedIndex = array.length - index;
          return (
            <div
              key={toast.id}
              className="absolute bottom-0 right-0 w-[400px] transition-transform duration-500 ease-in-out before:absolute before:inset-x-[var(--gap)] before:top-[var(--gap)] before:bottom-0"
              style={
                {
                  "--index": reversedIndex,
                  "--gap": "-14px",
                  transform: hovering
                    ? "translateY(calc((var(--index) - 1) * -85px))"
                    : "translateY(calc((var(--index) - 1) * -15px)) scale(calc(-1 * (var(--index) - 1) * 0.05 + 1))",
                } as CSSProperties
              }
              onMouseEnter={() => setHovering(true)}
            >
              <ToastComponent toast={toast} />
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function ToastComponent({ toast }: { toast: IToast<ToastExtraProps> }) {
  const { removeToast } = useToast<ToastExtraProps>();

  const ref = useToastTimer<HTMLDivElement>(toast.id, {
    duration: 3,
    pauseOnHover: true,
    sticky: toast.props.sticky,
  });

  return (
    <motion.div
      ref={ref}
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
      {toast.props.sticky && (
        <div className="absolute top-2 right-3 text-[8px] font-semibold px-2 py-1 rounded bg-white/10 flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2 w-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Sticky</span>
        </div>
      )}

      <div className="text-sm mb-0.5 font-medium">
        {toast.message} {toast.id}
      </div>
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
