import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			maxSnack={3}
		>
			<Component {...pageProps} />
		</SnackbarProvider>
	);
}

export default MyApp;
