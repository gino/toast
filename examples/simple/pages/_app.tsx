import { ToastProvider } from "@gino/toast";
import type { AppProps } from "next/app";
import { Portal } from "../components/Portal";
import { ToastContainer } from "../components/ToastContainer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ToastProvider>
			<Component {...pageProps} />

			<Portal>
				<ToastContainer />
			</Portal>
		</ToastProvider>
	);
}

export default MyApp;
