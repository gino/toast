import { ReactElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactElement;
  selector?: string;
}

export function Portal({ children, selector = "#portal" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);

    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current!) : null;
}
