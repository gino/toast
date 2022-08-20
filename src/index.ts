import { createContext, useContext } from "react";

interface Toast {
	id: string;
}

interface ToastContext {
	toasts: Toast[];
}

const toastContext = createContext<ToastContext>(null!);

export function useToast() {
	const context = useContext(toastContext);

	if (!context) {
		throw new Error(
			"Unable to find ToastContext, make sure to wrap your app with our `ToastProvider`"
		);
	}

	return context;
}
