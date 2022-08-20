import { ToastProvider } from "@gino/toast";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ToastProvider>
			<Component {...pageProps} />
		</ToastProvider>
	);
}

export default MyApp;
