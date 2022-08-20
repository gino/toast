import {
	createContext,
	ReactElement,
	useContext,
	useMemo,
	useState,
} from "react";
import { Toast, ToastOptions } from "./types";

interface ToastContext<T extends object = {}> {
	toasts: Toast<T>[];
	toast: (message: string, options: ToastOptions<T>) => Toast<T>;
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
}

export function ToastProvider({ children }: ToastProviderProps) {
	const [toasts, setToasts] = useState<Toast[]>([]);

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

				setToasts((toasts) => [...toasts, toast]);

				return toast;
			},
		}),
		[toasts]
	);

	return (
		<ToastContext.Provider value={memoizedValue}>
			{children}
		</ToastContext.Provider>
	);
}
