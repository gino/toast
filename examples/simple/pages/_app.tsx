import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastProvider } from "@gino/toast";
import { ToastContainer } from "../components/ToastContainer";
import { Portal } from "../components/Portal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider options={{ removeFirstOnLimit: true, limit: 10 }}>
      <Component {...pageProps} />

      <Portal>
        <ToastContainer />
      </Portal>
    </ToastProvider>
  );
}

export default MyApp;
