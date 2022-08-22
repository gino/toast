import { ToastTimerOptions } from "./types";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useToast } from "./context";

export function useToastTimer<T extends HTMLElement = any>(
  toastId: string,
  options?: ToastTimerOptions
): MutableRefObject<T | null> {
  const ref = useRef<T>(null);
  const [isPaused, setIsPaused] = useState(false);

  const { removeToast } = useToast();

  const duration = options?.duration ?? 3;
  const pauseOnHover =
    options?.pauseOnHover === undefined ? true : options?.pauseOnHover;
  const sticky = options?.sticky === undefined ? false : options?.sticky;

  useEffect(() => {
    if (!ref || !pauseOnHover) return;

    const mouseOver = ref.current?.addEventListener("mouseover", () =>
      setIsPaused(true)
    );
    const mouseLeave = ref.current?.addEventListener("mouseleave", () =>
      setIsPaused(false)
    );

    return () => {
      ref.current?.removeEventListener("mouseover", mouseOver!);
      ref.current?.removeEventListener("mouseleave", mouseLeave!);
    };
  }, [ref, pauseOnHover]);

  useEffect(() => {
    if (!ref || isPaused || sticky) return;
    const timeout = setTimeout(() => {
      removeToast(toastId);
    }, duration * 1000);

    return () => clearTimeout(timeout);
  }, [ref, isPaused, sticky]);

  return ref;
}
