import { createContext, ReactElement, useContext } from "react";
import { Toast } from "./types";

interface ToastContext {
	toasts: Toast[];
}

const ToastContext = createContext<ToastContext>(null!);

export function useToast() {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error(
			"Unable to find ToastContext, make sure to wrap your app with our `ToastProvider`"
		);
	}

	return context;
}

interface ToastProviderProps {
	children: ReactElement | ReactElement[];
}

export function ToastProvider({ children }: ToastProviderProps) {
	return (
		<ToastContext.Provider value={{ toasts: [] }}>
			{children}
		</ToastContext.Provider>
	);
}
