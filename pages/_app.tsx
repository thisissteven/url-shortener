import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Url Shortener</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="stevenn.tech is a platform where you can shorten any link for free."></meta>
				<meta property="og:title" content="Home - stevenn.tech"></meta>
				<meta
					property="og:description"
					content="stevenn.tech is a platform where you can shorten any link for free."
				></meta>
			</Head>
			<SnackbarProvider
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				maxSnack={3}
			>
				<Component {...pageProps} />
			</SnackbarProvider>
		</>
	);
}

export default MyApp;
